const mongoose = require('mongoose');

const displacementSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },

    scooter_id: {
        type: String,
        required: true,
    },

    final_locallity: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
        default: 'active',
    }
}, { timestamps: true });

module.exports = mongoose.model('Displacement', displacementSchema);