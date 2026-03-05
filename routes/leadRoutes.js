const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createLead, getLeads, getLead, updateLeadStatus, deleteLead, exportLeads } = require('../controllers/leadController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', upload.single('file'), createLead);
router.get('/', protect, adminOnly, getLeads);
router.get('/export', protect, adminOnly, exportLeads);
router.get('/:id', protect, adminOnly, getLead);
router.patch('/:id', protect, adminOnly, updateLeadStatus);
router.delete('/:id', protect, adminOnly, deleteLead);

module.exports = router;
