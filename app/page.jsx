"use client"

import { useState, useEffect } from 'react';
import Date from "@/components/Date";

import FiveDays from '@/components/FiveDays';

const WeatherApp = () => {
  const [city, setCity] = useState("Lucknow");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "1ff4cf5b8f158442c5c6e1c087c0168e";

  const getWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };


  const handleChange = (e) => {
    setCity(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
   
  };
  
  
  useEffect(() => {
   
    getWeather();
   
  }, [weatherData]);

  return (
    <section>
      <div className="container">
        <div className="box">
          <div className="searchcity">
            <input
              type="text"
              className="sm:max-w-full w-80 py-2 px-3 text-base text-slate-900 placeholder:text-slate-600 outline-none"
              placeholder="Search City..."
              value={city}
              onChange={handleChange}
            />
            <input
              type="button"
              className="mx-2 bg-red-600 py-2 px-3 rounded cursor-pointer text-white"
              value="Search"
              onClick={handleSubmit}
            />
          </div>

          {weatherData ? (
            <div className="weatherdata py-5">
              <h2 className="font-bold text-4xl">{weatherData.name}, {weatherData.sys.country}</h2>
              <Date />
              <div className="temp">
                <img className="m-auto" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description} />
                <h1 className="text-6xl font-bold">{Math.round(weatherData.main.temp)}°C</h1>
                <p className="text-red-400 text-xl">{weatherData.weather[0].description}</p>
              </div>
              <div className="weather-info flex justify-evenly">
                <div className="col">
                  <p className="wind">{weatherData.wind.speed}m/s</p>
                  <p>Wind speed</p>
                </div>
                <div className="col">
                  <p className="humidity">{weatherData.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              {/* <ForeCast city={city} apiKey={apiKey} /> */}
              <FiveDays  city={city} apiKey={apiKey} />
            </div>
          ) : (
            <p className="py-5 font-bold">Data not found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WeatherApp;
