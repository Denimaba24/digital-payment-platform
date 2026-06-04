const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { fullName, phone } = req.body;
    const user = await User.findById(req.userId);

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;

    await user.save();
    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get balance
router.get('/balance', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('balance');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get referral info
router.get('/referral/info', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('referralCode');
    const referredUsers = await User.countDocuments({ referredBy: req.userId });

    res.json({
      referralCode: user.referralCode,
      referredCount: referredUsers,
      referralLink: `${process.env.FRONTEND_URL}?ref=${user.referralCode}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
