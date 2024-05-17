import React, { useState, useEffect } from 'react';

function UserLocation() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                error => {
                    setError(error);
                }
            );
        } else {
            setError(new Error('Geolocation is not supported by this browser.'));
        }
    }, []);

    return { currentLocation: location, error };
}

export default UserLocation;
