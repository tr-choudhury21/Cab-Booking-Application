import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/booking" element={<Booking />} /> 
      </Routes>
    </Router>
  );
};

export default App;
