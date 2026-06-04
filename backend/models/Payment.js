const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'gopay', 'ovo', 'dana', 'linkaja', 'credit_card'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'settlement', 'expire', 'cancel', 'deny', 'refund'],
    default: 'pending',
  },
  snapToken: {
    type: String,
    default: null,
  },
  redirectUrl: {
    type: String,
    default: null,
  },
  midtransData: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  paymentDetails: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
