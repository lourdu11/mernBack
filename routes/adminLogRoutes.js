const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/adminLogController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getLogs);

module.exports = router;
