import { useState, useEffect } from 'react';

const ForeCast = ({ city, apiKey }) => {
  const [foreCast, setForeCast] = useState(null);
  const [error, setError] = useState(null);



  const getForeCast = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!res.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        const data = await res.json();
        console.log("foreCast",data)
        setForeCast(data);
      } catch (error) {
        setError(error.message);
      }
    }

  useEffect(() => {
     getForeCast();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className='py-3 forecast'>
      <h2 className='text-xl font-extrabold'>5-Day Forecast:</h2>
      {foreCast && (
        <>
      <p>City name: {foreCast.city.name}</p>
        
        <div className="grid grid-cols-5 gap-3">
          <div className='days'> <p>Temperature: {Math.round(foreCast.list[8].main.temp)} °C</p>
          </div>
          <div className='days'><p>Temperature: {Math.round(foreCast.list[16].main.temp)} °C</p></div>
          <div className='days'><p>Temperature: {Math.round(foreCast.list[24].main.temp)} °C</p></div>
          <div className='days'><p>Temperature: {Math.round(foreCast.list[32].main.temp)} °C</p></div>
          <div className='days'><p>Temperature: {Math.round(foreCast.list[39].main.temp)} °C</p></div>
          
         
        </div>
        </>
      )}
    </section>
  );
};

export default ForeCast;
