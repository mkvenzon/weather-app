import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, selectWeather } from '../redux/weatherSlice';
import { AppDispatch } from '../redux/store';

const Weather: React.FC = () => {
    const [location, setLocation] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const weather = useSelector(selectWeather);

    const handleFetchWeather = () => {
        dispatch(fetchWeather(location));
    };

    return (
        <div className="weather-container">
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
            />
            <button onClick={handleFetchWeather}>Get Weather</button>
            {weather && (
                <div className="weather-info">
                    <h3>{weather.name}</h3>
                    <p>{weather.weather[0].description}</p>
                    <p>{weather.main.temp}°C</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
