"use client";

import Navigator from "@/components/navigator";
// import axios from "axios";
import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { WiCloudy } from "react-icons/wi";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState('');
  const [loading, setLoading] = useState(false);
  // const [weatherIcon, setWeatherIcon] = useState(null);

  // const ApiKey = process.env.API_KEY;


  const getWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c9e4be29cb6580b6191588da600ad5d9&units=metric`);
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`);

      const data = await response.json()
      console.log(data);
      setWeatherData(data)
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle error gracefully
      return (
        console.log("data not found:",error)
      )
    }
  };
  


  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
      // getWeather();
      setTimeout(() => {
        getWeather('');
        setLoading(false);
      }, 5000); 


    // const data = await getWeather(city);
    // // Prevent default form submission behavior
    // setWeatherData(data);
    // console.log("city nam:", data);
  };



 // Get weather icon
//  const iconCode = weatherData.weather[0].icon;
//  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
//  setWeatherIcon(iconUrl);

    
   
  return (
    <section className="flex  justify-center h-screen mt-10 weather-app">
      {/* <Navigator /> */}
      <div className="title text-center">
        <div className="card  ">
          <h1 className="font-bold text-left py-3"><WiCloudy /> Weather App</h1>

          <form >
            <input
              type="text"
              className="py-2 px-3 w-80 border-r-2"
              name="city"
              placeholder="enter city"
              onChange={handleChange}
              required
            />
            <input
              type="button"
              onClick={handleSubmit}
              className="btn bg-red-500 py-2 px-2 mx-1 cursor-pointer"
              value="search"
            />
          </form>

         {/* Display weather data */}
         {loading && <p>Loading data...</p>}

         {!loading && weatherData && 
  <div>
    <h1 className="font-bold pt-5">{weatherData.main.temp}°C</h1>
    <p>{weatherData.weather[0].description}</p>
    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      className="m-auto" alt="Weather Icon" />
    <p className="border-b mb-5">
      <span><FiMapPin /> {weatherData.name}, {weatherData.sys.country}</span>
    </p>
    <div className="flex justify-around">
      <p>Wind: {weatherData.wind.speed} km/h</p>
      <p>Humidity: {weatherData.main.humidity} %</p>
    </div>
    <div className="flex justify-around">
      <p>Min Temp: {weatherData.main.temp_min}</p>
      <p>Max Temp: {weatherData.main.temp_max}</p>
    </div>
  </div>
}

 

          
          {/* <p>{weatherData}</p> */}
        </div>
      </div>
    </section>
  );
}
