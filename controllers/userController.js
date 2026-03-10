const UserModel = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    
    
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { emailNotifications, reminderDays } = req.body;
    
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        'settings.emailNotifications': emailNotifications,
        'settings.reminderDays': reminderDays
      },
      { new: true }
    ).select('-password');

    res.json({ message: 'Settings updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProfile, updateProfile, updateSettings };