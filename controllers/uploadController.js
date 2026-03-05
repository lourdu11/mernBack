const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        // Unique filename using timestamp + exact random string
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File type filter
const fileFilter = (req, file, cb) => {
    const allowedImageTypes = /jpeg|jpg|png|webp|gif/;
    const extname = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedImageTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: fileFilter
});

// Controller to handle multiple image uploads
exports.uploadMultipleImages = (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        // Return array of file paths
        const fileUrls = req.files.map(file => `/uploads/${file.filename}`);

        res.status(200).json({
            success: true,
            message: 'Files uploaded successfully',
            urls: fileUrls
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.uploadMiddleware = upload.array('images', 10); // max 10 images at once
