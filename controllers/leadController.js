const Lead = require('../models/Lead');
const AdminLog = require('../models/AdminLog');
const { sendLeadNotification, sendLeadConfirmation } = require('../utils/sendEmail');

const createLead = async (req, res, next) => {
    try {
        const { name, email, phone, service, budget, timeline, message } = req.body;
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
        const lead = await Lead.create({ name, email, phone, service, budget, timeline, message, fileUrl });
        // Fire emails asynchronously
        sendLeadNotification(lead);
        sendLeadConfirmation(lead);
        res.status(201).json({ success: true, message: 'Lead submitted successfully!', lead });
    } catch (err) {
        next(err);
    }
};

const getLeads = async (req, res, next) => {
    try {
        const { status, service, search, page = 1, limit = 20, startDate, endDate } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (service) filter.service = service;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
            ];
        }
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }
        const total = await Lead.countDocuments(filter);
        const leads = await Lead.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json({ success: true, leads, total, page: parseInt(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        next(err);
    }
};

const getLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
        res.json({ success: true, lead });
    } catch (err) {
        next(err);
    }
};

const updateLeadStatus = async (req, res, next) => {
    try {
        const { status, note } = req.body;
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
        if (status) lead.status = status;
        if (note) lead.notes.push({ text: note, addedBy: req.user.name });
        await lead.save();
        await AdminLog.create({
            admin: req.user.name,
            adminId: req.user._id,
            action: 'UPDATE_LEAD',
            entity: 'Lead',
            entityId: lead._id.toString(),
            details: `Updated lead ${lead.name} status to ${status || 'unchanged'}`,
        });
        res.json({ success: true, lead });
    } catch (err) {
        next(err);
    }
};

const deleteLead = async (req, res, next) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
        await AdminLog.create({
            admin: req.user.name,
            adminId: req.user._id,
            action: 'DELETE_LEAD',
            entity: 'Lead',
            entityId: req.params.id,
            details: `Deleted lead: ${lead.name} (${lead.email})`,
        });
        res.json({ success: true, message: 'Lead deleted' });
    } catch (err) {
        next(err);
    }
};

const exportLeads = async (req, res, next) => {
    try {
        const { status, service, startDate, endDate } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (service) filter.service = service;
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }
        const leads = await Lead.find(filter).sort({ createdAt: -1 });
        const header = 'Name,Email,Phone,Service,Budget,Timeline,Status,Date\n';
        const rows = leads
            .map((l) =>
                `"${l.name}","${l.email}","${l.phone}","${l.service}","${l.budget || ''}","${l.timeline || ''}","${l.status}","${l.createdAt.toISOString().split('T')[0]}"`
            )
            .join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="leads_export.csv"');
        res.send(header + rows);
    } catch (err) {
        next(err);
    }
};

module.exports = { createLead, getLeads, getLead, updateLeadStatus, deleteLead, exportLeads };
