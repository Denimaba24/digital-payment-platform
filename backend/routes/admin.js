const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Dashboard stats
router.get('/dashboard/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalRevenue = await Transaction.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$finalAmount' } } },
    ]);

    res.json({
      totalUsers,
      totalProducts,
      totalTransactions,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all transactions
router.get('/transactions', adminAuth, async (req, res) => {
  try {
    const { status, paymentStatus } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const transactions = await Transaction.find(filter)
      .populate('userId')
      .populate('productId')
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update transaction status
router.put('/transactions/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction updated', transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
