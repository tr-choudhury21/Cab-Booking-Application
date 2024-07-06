import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-8">Register</h1>
        <RegisterForm />
        </div>
    );
};

export default Register;
