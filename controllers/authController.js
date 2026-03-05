const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AdminLog = require('../models/AdminLog');

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide all fields' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }
        const user = await User.create({
            name,
            email,
            password,
            role: 'student'
        });
        const token = generateToken(user._id);
        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        if (!user.isActive) {
            return res.status(403).json({ success: false, message: 'Account is deactivated' });
        }
        await User.updateOne({ _id: user._id }, { lastLogin: new Date() });

        await AdminLog.create({
            admin: user.name,
            adminId: user._id,
            action: 'LOGIN',
            details: `Admin logged in from IP: ${req.ip}`,
            ip: req.ip,
        });

        const token = generateToken(user._id);
        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

const getMe = async (req, res) => {
    res.json({ success: true, user: req.user });
};

module.exports = { login, register, getMe };
