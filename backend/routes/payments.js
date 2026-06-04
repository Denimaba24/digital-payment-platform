const express = require('express');
const Payment = require('../models/Payment');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { snap } = require('../config/midtrans');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create payment
router.post('/create', auth, async (req, res) => {
  try {
    const { transactionId, paymentMethod } = req.body;

    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID required' });
    }

    const transaction = await Transaction.findById(transactionId).populate('productId').populate('userId');
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.userId._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const orderId = `ORD${Date.now()}`;

    const paymentData = {
      transaction_details: {
        order_id: orderId,
        gross_amount: transaction.finalAmount,
      },
      customer_details: {
        first_name: transaction.userId.fullName || 'Customer',
        email: transaction.userId.email,
        phone: transaction.phoneNumber,
      },
      item_details: [
        {
          id: transaction.productId._id,
          price: transaction.finalAmount,
          quantity: transaction.quantity,
          name: transaction.productId.name,
        },
      ],
    };

    const snapToken = await snap.createTransaction(paymentData);

    const payment = new Payment({
      orderId,
      transactionId: transaction._id,
      userId: req.userId,
      amount: transaction.finalAmount,
      paymentMethod: paymentMethod || 'gopay',
      status: 'pending',
      snapToken: snapToken.token,
      redirectUrl: snapToken.redirect_url,
    });

    await payment.save();

    res.json({
      message: 'Payment created',
      snapToken: snapToken.token,
      redirectUrl: snapToken.redirect_url,
      paymentId: payment._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payment status
router.get('/:orderId', auth, async (req, res) => {
  try {
    const payment = await Payment.findOne({ orderId: req.params.orderId });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Midtrans Webhook
router.post('/notification', async (req, res) => {
  try {
    const { order_id, transaction_status } = req.body;

    const payment = await Payment.findOne({ orderId: order_id });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      payment.status = 'settlement';

      const transaction = await Transaction.findById(payment.transactionId);
      transaction.status = 'processing';
      transaction.paymentStatus = 'paid';
      await transaction.save();

      const user = await User.findById(payment.userId);
      user.balance += payment.amount * 0.1;
      await user.save();
    } else if (transaction_status === 'expire') {
      payment.status = 'expire';
      const transaction = await Transaction.findById(payment.transactionId);
      transaction.status = 'failed';
      await transaction.save();
    } else if (transaction_status === 'cancel' || transaction_status === 'deny') {
      payment.status = 'cancel';
      const transaction = await Transaction.findById(payment.transactionId);
      transaction.status = 'failed';
      await transaction.save();
    }

    await payment.save();
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
