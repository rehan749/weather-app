"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = await getWeather(city)
     // Prevent default form submission behavior
    setWeatherData(data)
    console.log("city nam:", data);
  };

  // const reponse = async()=>{
  //     const weather = await (`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid={process.env.apiKey}&units=metric`)
  //     console.log(weather.data);
  //   }

    const getWeather = async (data) => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c9e4be29cb6580b6191588da600ad5d9&units=metric`);
        console.log(response.data);
        // Do something with the weather data here
        return response.data; // Optionally return the data if you need to use it elsewhere
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle error gracefully
        return null;
      }
    };
    


    // Example usage
   
    // getWeather('London');
  return (
    <section className="flex align-middle justify-center h-screen mt-10">
      <div className="title text-center">
        <div className="card border-2 p-2 bg-blue-400">
          <h1>Weather App</h1>

          <form  onSubmit={handleSubmit}>
            <input
              type="text"
              className="py-2 px-2 w-80"
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
 {weatherData && (
  <div>
    <h1 className="font-bold">{weatherData.main.temp}°C</h1>
    <p> {weatherData.weather[0].description}</p>
    <p className="border-b"> {weatherData.name}, {weatherData.sys.country} </p>

<div className="flex justify-around">
  {/* <p>Avg Temp:{}</p> */}
  <p>Min Temp:{weatherData.main.temp_min}</p>
  <p>   Max Temp:{weatherData.main.temp_max}</p>
</div>

    {/* Access other properties as needed */}
  </div>
)}
          
          {/* <p>{weatherData}</p> */}
        </div>
      </div>
    </section>
  );
}
