const Blog = require('../models/Blog');
const AdminLog = require('../models/AdminLog');

const createBlog = async (req, res, next) => {
    try {
        const { title, excerpt, content, category, tags, coverImage, author, isPublished, metaTitle, metaDescription } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
        const blog = await Blog.create({ title, slug, excerpt, content, category, tags, coverImage, author, isPublished, metaTitle, metaDescription });
        await AdminLog.create({ admin: req.user.name, adminId: req.user._id, action: 'CREATE_BLOG', entity: 'Blog', entityId: blog._id.toString(), details: `Created blog: ${title}` });
        res.status(201).json({ success: true, blog });
    } catch (err) { next(err); }
};

const getBlogs = async (req, res, next) => {
    try {
        const { category, page = 1, limit = 10, isPublished } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (isPublished !== undefined) filter.isPublished = isPublished === 'true';
        const total = await Blog.countDocuments(filter);
        const blogs = await Blog.find(filter).select('-content').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
        res.json({ success: true, blogs, total, pages: Math.ceil(total / limit) });
    } catch (err) { next(err); }
};

const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        blog.views += 1;
        await blog.save();
        res.json({ success: true, blog });
    } catch (err) { next(err); }
};

const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        await AdminLog.create({ admin: req.user.name, adminId: req.user._id, action: 'UPDATE_BLOG', entity: 'Blog', entityId: req.params.id });
        res.json({ success: true, blog });
    } catch (err) { next(err); }
};

const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        await AdminLog.create({ admin: req.user.name, adminId: req.user._id, action: 'DELETE_BLOG', entity: 'Blog', entityId: req.params.id, details: `Deleted: ${blog.title}` });
        res.json({ success: true, message: 'Blog deleted' });
    } catch (err) { next(err); }
};

module.exports = { createBlog, getBlogs, getBlog, updateBlog, deleteBlog };
