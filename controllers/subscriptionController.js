const Subscription = require('../models/Subscription');

const subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
        const existing = await Subscription.findOne({ email });
        if (existing) return res.status(409).json({ success: false, message: 'Already subscribed!' });
        await Subscription.create({ email });
        res.status(201).json({ success: true, message: 'Subscribed successfully!' });
    } catch (err) { next(err); }
};

const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({ success: true, subscriptions, total: subscriptions.length });
    } catch (err) { next(err); }
};

module.exports = { subscribe, getSubscriptions };
