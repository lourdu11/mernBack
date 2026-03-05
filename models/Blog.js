const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, required: true },
        tags: [{ type: String }],
        coverImage: { type: String },
        images: [{ type: String }],
        videos: [{ type: String }],
        author: { type: String, default: 'Sprouts Orgs Team' },
        isPublished: { type: Boolean, default: false },
        views: { type: Number, default: 0 },
        metaTitle: { type: String },
        metaDescription: { type: String },
    },
    { timestamps: true }
);

blogSchema.index({ category: 1 });
blogSchema.index({ isPublished: 1 });

module.exports = mongoose.model('Blog', blogSchema);
