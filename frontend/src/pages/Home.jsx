import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-8">Welcome to Cab Booking App</h1>
            <RegisterForm />
        </div>
    );
};

export default Home;
