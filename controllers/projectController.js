const Project = require('../models/Project');
const AdminLog = require('../models/AdminLog');

const createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        await AdminLog.create({ admin: req.user.name, adminId: req.user._id, action: 'CREATE_PROJECT', entity: 'Project', entityId: project._id.toString(), details: `Created: ${project.title}` });
        res.status(201).json({ success: true, project });
    } catch (err) { next(err); }
};

const getProjects = async (req, res, next) => {
    try {
        const { category, featured } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (featured !== undefined) filter.isFeatured = featured === 'true';
        const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
        res.json({ success: true, projects });
    } catch (err) { next(err); }
};

const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        await AdminLog.create({ admin: req.user.name, adminId: req.user._id, action: 'UPDATE_PROJECT', entity: 'Project', entityId: req.params.id });
        res.json({ success: true, project });
    } catch (err) { next(err); }
};

const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Not found' });
        await AdminLog.create({ admin: req.user.name, adminId: req.user._id, action: 'DELETE_PROJECT', entity: 'Project', entityId: req.params.id });
        res.json({ success: true, message: 'Project deleted' });
    } catch (err) { next(err); }
};

module.exports = { createProject, getProjects, updateProject, deleteProject };
