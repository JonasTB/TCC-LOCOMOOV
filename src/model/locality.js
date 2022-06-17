const mongoose = require('mongoose');

const LocalitySchema = new mongoose.Schema({
    lat: {
        type: String,
        required: true,
    },

    long: {
        type: String,
        required: true,
    },

    scootersAvailable: {
        type: Number,
        required: true, 
    },

    parkingAvailable: {
        type: Number,
        required: true,
    },

    scootersMaintenance: {
        type: Number,
        required: true,
    },

    scooters: {
        type: [mongoose.Types.ObjectId],
        ref: 'Scooter',
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Locality', LocalitySchema);