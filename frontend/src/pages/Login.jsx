import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <LoginForm />
        </div>
    );
};

export default Login;
