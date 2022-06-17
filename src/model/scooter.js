const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ScooterSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },

    localization: {
        type: String,
        required: true,
    },

    battery: {
        type: String,
        required: true,
    },

    status: {
        type: Number,
        required: true,
    },

    locality: {
        type: mongoose.Types.ObjectId,
        ref: 'Locality',
        required: false,
    },

}, { timestamps: true });

module.exports = mongoose.model('Scooter', ScooterSchema);