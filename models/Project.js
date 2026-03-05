const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, unique: true, sparse: true, lowercase: true },
        description: { type: String, required: true },
        category: {
            type: String,
            required: true,
            enum: ['Web Development', 'Mobile App', 'EdTech', 'Digital Marketing', 'Software', 'AI Models', 'Hackathons', 'Other'],
        },
        client: { type: String },
        techStack: [{ type: String }],
        imageUrl: { type: String },
        images: [{ type: String }],
        videos: [{ type: String }],
        liveUrl: { type: String },
        githubUrl: { type: String },
        caseStudy: { type: String },
        isFeatured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

projectSchema.index({ category: 1 });
projectSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Project', projectSchema);
