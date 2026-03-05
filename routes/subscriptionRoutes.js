const express = require('express');
const router = express.Router();
const { subscribe, getSubscriptions } = require('../controllers/subscriptionController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', subscribe);
router.get('/', protect, adminOnly, getSubscriptions);

module.exports = router;
