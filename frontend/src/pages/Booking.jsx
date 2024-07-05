import React from 'react';
import BookingForm from '../components/BookingForm';

const Booking = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-8">Book a Cab</h1>
        <BookingForm />
        </div>
    );
};

export default Booking;
