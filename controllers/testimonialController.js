const Testimonial = require('../models/Testimonial');
const AdminLog = require('../models/AdminLog');

const createTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.create(req.body);
        await AdminLog.create({ admin: req.user.name, adminId: req.user._id, action: 'CREATE_TESTIMONIAL', entity: 'Testimonial', entityId: testimonial._id.toString() });
        res.status(201).json({ success: true, testimonial });
    } catch (err) { next(err); }
};

const getTestimonials = async (req, res, next) => {
    try {
        const filter = req.query.all ? {} : { isPublished: true };
        const testimonials = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
        res.json({ success: true, testimonials });
    } catch (err) { next(err); }
};

const updateTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!testimonial) return res.status(404).json({ success: false, message: 'Not found' });
        await AdminLog.create({ admin: req.user.name, adminId: req.user._id, action: 'UPDATE_TESTIMONIAL', entity: 'Testimonial', entityId: req.params.id });
        res.json({ success: true, testimonial });
    } catch (err) { next(err); }
};

const deleteTestimonial = async (req, res, next) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        await AdminLog.create({ admin: req.user.name, adminId: req.user._id, action: 'DELETE_TESTIMONIAL', entity: 'Testimonial', entityId: req.params.id });
        res.json({ success: true, message: 'Deleted' });
    } catch (err) { next(err); }
};

module.exports = { createTestimonial, getTestimonials, updateTestimonial, deleteTestimonial };
