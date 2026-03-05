const express = require('express');
const router = express.Router();
const { createTestimonial, getTestimonials, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getTestimonials);
router.post('/', protect, adminOnly, createTestimonial);
router.put('/:id', protect, adminOnly, updateTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

module.exports = router;
