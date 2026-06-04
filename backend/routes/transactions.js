const express = require('express');
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create transaction
router.post('/', auth, async (req, res) => {
  try {
    const { productId, phoneNumber, quantity = 1 } = req.body;

    if (!productId || !phoneNumber) {
      return res.status(400).json({ message: 'Product ID and phone number required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!product.isActive) {
      return res.status(400).json({ message: 'Product is not available' });
    }

    const totalAmount = product.finalPrice * quantity;
    const transactionId = `TRX${Date.now()}`;

    const transaction = new Transaction({
      transactionId,
      userId: req.userId,
      productId,
      quantity,
      amount: product.price * quantity,
      finalAmount: totalAmount,
      phoneNumber,
      status: 'pending',
    });

    await transaction.save();

    res.status(201).json({
      message: 'Transaction created',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })
      .populate('productId')
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get transaction by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('productId')
      .populate('userId');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.userId._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
