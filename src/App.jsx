import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import './styles.css';

const App = () => {
    const [weather, setWeather] = useState(null);
    const [cityTime, setCityTime] = useState(new Date());
    const [cityTimezone, setCityTimezone] = useState(null);
    const [theme, setTheme] = useState('light');

    // Function to get weather data
    const getWeather = async (city) => {
        const apiKey = 'da7e7154c600b7e99a0c7d967f6890fb';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        try {
            const response = await axios.get(url);
            setWeather(response.data);
            setCityTimezone(response.data.timezone);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeather(null);
        }
    };

    // Update city time every second based on the city timezone
    useEffect(() => {
        const updateCityTime = () => {
            const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
            const cityTime = new Date(utcTime + cityTimezone * 1000);
            setCityTime(cityTime);
        };

        if (cityTimezone !== null) {
            const interval = setInterval(updateCityTime, 1000);
            return () => clearInterval(interval);
        }
    }, [cityTimezone]);

    // Function to format the date and time
    const formatDateTime = (date) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return date.toLocaleDateString('en-US', options);
    };

    // Function to toggle between dark and light mode
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme); // Apply the new theme
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>

            {/* Display Current Date and Time in the entered city's timezone */}
            {cityTimezone !== null && (
                <p>Current Date & Time in {weather?.name}: {formatDateTime(cityTime)}</p>
            )}

            <WeatherForm getWeather={getWeather} />
            <WeatherDisplay weather={weather} />

            {/* Theme Toggle Button */}
            <button className="theme-toggle-button" onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
};

export default App;