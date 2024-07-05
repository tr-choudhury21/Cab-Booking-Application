const Booking = require('../models/bookingModel');

const createBooking = async (req, res) => {
    const { user, pickupLocation, dropLocation, date } = req.body;
    try {
        const booking = new Booking({ user, pickupLocation, dropLocation, date });
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = { createBooking };
