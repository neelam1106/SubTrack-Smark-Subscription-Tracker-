const cron = require('node-cron');
const { sendReminderEmail } = require('../utils/emailService');
const SubscriptionModel = require('../models/Subscription');
const UserModel = require('../models/User');

const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SubscriptionModel.find({ 
      userId: req.user._id,
      isActive: true 
    }).sort({ renewalDate: 1 });
    
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createSubscription = async (req, res) => {
  try {
    const { name, category, price, renewalDate, frequency } = req.body;
    
    const subscription = new SubscriptionModel({
      userId: req.user._id,
      name,
      category,
      price,
      renewalDate,
      frequency
    });

    await subscription.save();
    
    // Check if we should send an immediate reminder for subscriptions due soon
    const user = await UserModel.findById(req.user._id);
    if (user.settings.emailNotifications) {
      const today = new Date();
      const renewalDate = new Date(subscription.renewalDate);
      const timeDiff = renewalDate.getTime() - today.getTime();
      const daysUntilRenewal = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (daysUntilRenewal <= user.settings.reminderDays && daysUntilRenewal > 0) {
        try {
          await sendReminderEmail(
            user.email,
            subscription.name,
            renewalDate,
            daysUntilRenewal
          );
        } catch (emailError) {
          console.error('Error sending immediate reminder:', emailError);
        }
      }
    }
    
    res.status(201).json({ message: 'Subscription created successfully', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, renewalDate, frequency } = req.body;
    
    const subscription = await SubscriptionModel.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { name, category, price, renewalDate, frequency },
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.json({ message: 'Subscription updated successfully', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    
    const subscription = await SubscriptionModel.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { isActive: false },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const subscriptions = await SubscriptionModel.find({ 
      userId: req.user._id,
      isActive: true 
    });

    const monthlyTotal = subscriptions
      .filter(sub => sub.frequency === 'Monthly')
      .reduce((sum, sub) => sum + sub.price, 0);

    const yearlySubscriptions = subscriptions.filter(sub => sub.frequency === 'Yearly');
    const yearlyTotal = yearlySubscriptions.reduce((sum, sub) => sum + sub.price, 0);

    const totalYearlyExpense = (monthlyTotal * 12) + yearlyTotal;

    const analytics = {
      totalSubscriptions: subscriptions.length,
      monthlyTotal,
      yearlyTotal: totalYearlyExpense,
      categoryBreakdown: {}
    };

    // Category breakdown
    subscriptions.forEach(sub => {
      const monthlyPrice = sub.frequency === 'Monthly' ? sub.price : sub.price / 12;
      analytics.categoryBreakdown[sub.category] = 
        (analytics.categoryBreakdown[sub.category] || 0) + monthlyPrice;
    });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { 
  getSubscriptions, 
  createSubscription, 
  updateSubscription, 
  deleteSubscription, 
  getAnalytics 
};