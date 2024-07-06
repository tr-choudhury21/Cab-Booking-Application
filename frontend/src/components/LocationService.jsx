import React, { useState, useEffect } from 'react';

const LocationService = ({ setLocation }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            },
            (err) => {
            setError(err.message);
            }
        );
        } else {
        setError("Geolocation is not supported by this browser.");
        }
    }, [setLocation]);

    return error ? <div>Error: {error}</div> : <div>Fetching location...</div>;
};

export default LocationService;
