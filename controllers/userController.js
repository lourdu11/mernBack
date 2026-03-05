const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, count: users.length, users });
    } catch (err) {
        next(err);
    }
};

const updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        user.role = role;
        await user.save();
        res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        // Prevent deleting the last superadmin
        if (user.role === 'superadmin') {
            const superAdminCount = await User.countDocuments({ role: 'superadmin' });
            if (superAdminCount <= 1) {
                return res.status(400).json({ success: false, message: 'Cannot delete the last superadmin' });
            }
        }

        await user.deleteOne();
        res.json({ success: true, message: 'User deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllUsers, updateUserRole, deleteUser };
