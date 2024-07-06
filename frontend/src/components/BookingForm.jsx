import React, { useState } from 'react';
import LocationService from './LocationService';
import MapComponent from './MapComponent';
import axios from 'axios';
import { bookingRoute } from '../services/api';

const BookingForm = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [userLocation, setUserLocation] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const booking = {
            pickupLocation,
            dropoffLocation,
            userLocation,
        };
        await axios.post(bookingRoute, booking);
        } catch (error) {
        console.error('Error creating booking:', error);
        }
    };

    return (
        <div>
        <h2>Book a Cab</h2>
        <LocationService setLocation={setUserLocation} />
        {userLocation && <MapComponent location={userLocation} />}
        <form onSubmit={handleSubmit}>
            <div>
            <label>Pickup Location</label>
            <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
            />
            </div>
            <div>
            <label>Dropoff Location</label>
            <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
            />
            </div>
            <button type="submit">Book Now</button>
        </form>
        </div>
    );
};

export default BookingForm;
