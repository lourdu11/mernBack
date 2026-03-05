const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Route for uploading multiple images. Accessible only to admins/superadmins.
router.post('/multiple', protect, adminOnly, uploadController.uploadMiddleware, uploadController.uploadMultipleImages);

module.exports = router;
