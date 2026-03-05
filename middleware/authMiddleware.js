const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, no token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user || !req.user.isActive) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token invalid or expired' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
        return next();
    }
    return res.status(403).json({ success: false, message: 'Access denied: Admin only' });
};

const superAdminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'superadmin') {
        return next();
    }
    return res.status(403).json({ success: false, message: 'Access denied: Super Admin only' });
};

module.exports = { protect, adminOnly, superAdminOnly };
