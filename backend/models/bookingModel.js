const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    cab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cab',
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropoffLocation: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Booked', 'Completed', 'Cancelled'],
        default: 'Booked'
    },
    bookingTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
