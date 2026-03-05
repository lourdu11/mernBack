const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        role: { type: String, required: true },
        company: { type: String },
        content: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, default: 5 },
        avatarUrl: { type: String },
        service: { type: String },
        isPublished: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
