const {model, mongoose} = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Education', 'Streaming', 'TV', 'Entertainment', 'Music', 'Others']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  renewalDate: {
    type: Date,
    required: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['Monthly', 'Yearly']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const SubscriptionModel = model('Subscription', subscriptionSchema);
module.exports = SubscriptionModel