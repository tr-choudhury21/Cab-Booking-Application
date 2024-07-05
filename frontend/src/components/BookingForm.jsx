import React, { useState } from 'react';
import axios from 'axios';
import { bookingRoute } from '../services/api';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        pickupLocation: '',
        dropoffLocation: '',
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(bookingRoute, formData);
        console.log('Booking created:', response.data);
        } catch (err) {
        console.error('Error:', err.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Book a Cab</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="pickupLocation">Pickup Location</label>
                <input
                type="text"
                name="pickupLocation"
                id="pickupLocation"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Pickup Location"
                value={formData.pickupLocation}
                onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="dropoffLocation">Dropoff Location</label>
                <input
                type="text"
                name="dropoffLocation"
                id="dropoffLocation"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dropoff Location"
                value={formData.dropoffLocation}
                onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="date">Date</label>
                <input
                type="date"
                name="date"
                id="date"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.date}
                onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="time">Time</label>
                <input
                type="time"
                name="time"
                id="time"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.time}
                onChange={handleChange}
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Book
            </button>
        </form>
    );
};

export default BookingForm;
