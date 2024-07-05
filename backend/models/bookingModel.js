const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
