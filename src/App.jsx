import React, { useState, useEffect } from "react";
import Navbar from "../src/components/Navbar";
import MainWeatherCard from "../src/components/mainweathercast";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";
import "./App.css"; // Import the CSS file

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London"); // Default city is set to London
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = '02670a1dd95c19e22644661a6d9e0c94'; // Replace with your OpenWeatherMap API key
    axios
      .get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(response => {
        setAirQualityData(response.data.list[0]); // Set the first item in the list as air quality data
      })
      .catch(error => console.error('Error fetching the air quality data:', error));
  };

  const fetchWeatherData = (city) => {
    const API_KEY = '02670a1dd95c19e22644661a6d9e0c94'; // Replace with your OpenWeatherMap API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        console.log(JSON.stringify(data));
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        axios
          .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
          .then(response => {
            setFiveDayForecast(response.data);
            console.log(JSON.stringify(response.data)); // For debugging purposes only
          })
          .catch(error => console.error('Error fetching the 5-day forecast data:', error));
      })
      .catch(error => console.error('Error fetching the weather data:', error));
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      {weatherData && airQualityData && (
        <div className="weather-dashboard-container">
          <div className="weather-main-section">
            <MainWeatherCard weatherData={weatherData} />
            <p className="weather-main-title">5 Days Forecast</p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
          </div>
          <div className="weather-highlight-section">
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
