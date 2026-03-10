const express = require('express');
const { 
  getSubscriptions, 
  createSubscription, 
  updateSubscription, 
  deleteSubscription, 
  getAnalytics
} = require('../controllers/subscriptionController');
const { sendImmediateReminders } = require('../utils/reminderScheduler');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getSubscriptions);
router.post('/', createSubscription);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);
router.get('/analytics', getAnalytics);


module.exports = router;