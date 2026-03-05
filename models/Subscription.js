const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true },
        isActive: { type: Boolean, default: true },
        source: { type: String, default: 'newsletter' },
    },
    { timestamps: true }
);



module.exports = mongoose.model('Subscription', subscriptionSchema);
