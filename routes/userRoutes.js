const express = require('express');
const { getProfile, updateProfile, updateSettings } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/settings', updateSettings);

module.exports = router;