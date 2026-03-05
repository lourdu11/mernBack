const AdminLog = require('../models/AdminLog');

const getLogs = async (req, res, next) => {
    try {
        const { page = 1, limit = 50 } = req.query;
        const total = await AdminLog.countDocuments();
        const logs = await AdminLog.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json({ success: true, logs, total, pages: Math.ceil(total / limit) });
    } catch (err) { next(err); }
};

module.exports = { getLogs };
