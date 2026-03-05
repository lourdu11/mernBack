const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true },
        phone: { type: String, required: true },
        service: {
            type: String,
            required: true,
            enum: [
                'Website Development',
                'Student Projects & EdTech Solutions',
                'Software Development',
                'Digital Marketing',
                'Internship / Training Programs',
                'Other',
            ],
        },
        budget: { type: String },
        timeline: { type: String },
        message: { type: String },
        fileUrl: { type: String },
        status: {
            type: String,
            enum: ['new', 'contacted', 'converted', 'closed'],
            default: 'new',
        },
        notes: [
            {
                text: { type: String },
                addedBy: { type: String },
                addedAt: { type: Date, default: Date.now },
            },
        ],
        source: { type: String, default: 'website' },
    },
    { timestamps: true }
);

leadSchema.index({ status: 1 });
leadSchema.index({ service: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ email: 1 });

module.exports = mongoose.model('Lead', leadSchema);
