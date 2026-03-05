const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema(
    {
        admin: { type: String, required: true },
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        action: { type: String, required: true },
        entity: { type: String },
        entityId: { type: String },
        details: { type: String },
        ip: { type: String },
    },
    { timestamps: true }
);

adminLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AdminLog', adminLogSchema);
