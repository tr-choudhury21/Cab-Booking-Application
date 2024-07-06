const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
    driverName: {
        type: String,
        required: true
    },
    carNumber: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Cab', cabSchema);
