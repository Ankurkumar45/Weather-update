import React from 'react';

const WeatherDisplay = ({ weather }) => {
    return (
        <div className="weather-display">
            {weather ? (
                <div>
                    <h2>{weather.name}</h2>
                    <p className="temperature">
                        {Math.round(weather.main.temp - 273.15)}°C
                    </p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            ) : (
                <p>No weather data available</p>
            )}
        </div>
    );
}

export default WeatherDisplay;