const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('cab');
        res.json(bookings);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.addBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const booking = await newBooking.save();
        res.json(booking);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
