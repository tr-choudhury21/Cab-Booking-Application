const express = require('express');
const router = express.Router();
const { getAllBookings, addBooking } = require('../controllers/bookingController');

router.get('/', getAllBookings);
router.post('/', addBooking);

module.exports = router;
