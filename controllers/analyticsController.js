const Lead = require('../models/Lead');

const getAnalytics = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const dateFilter = {};
        if (startDate) dateFilter.$gte = new Date(startDate);
        if (endDate) dateFilter.$lte = new Date(endDate);
        const filter = Object.keys(dateFilter).length ? { createdAt: dateFilter } : {};

        const [
            totalLeads,
            todayLeads,
            convertedLeads,
            byService,
            byStatus,
            byMonth,
        ] = await Promise.all([
            Lead.countDocuments(filter),
            Lead.countDocuments({ ...filter, createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }),
            Lead.countDocuments({ ...filter, status: 'converted' }),
            Lead.aggregate([
                { $match: filter },
                { $group: { _id: '$service', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ]),
            Lead.aggregate([
                { $match: filter },
                { $group: { _id: '$status', count: { $sum: 1 } } },
            ]),
            Lead.aggregate([
                { $match: filter },
                {
                    $group: {
                        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { '_id.year': 1, '_id.month': 1 } },
                { $limit: 12 },
            ]),
        ]);

        const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

        res.json({
            success: true,
            data: {
                totalLeads,
                todayLeads,
                convertedLeads,
                conversionRate: parseFloat(conversionRate),
                byService,
                byStatus,
                byMonth: byMonth.map((m) => ({
                    month: `${m._id.year}-${String(m._id.month).padStart(2, '0')}`,
                    count: m.count,
                })),
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAnalytics };
