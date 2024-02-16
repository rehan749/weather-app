import  {useState, useEffect} from 'react'

const ForeCast = ({city,apiKey}) => {

    const [foreCast, setForeCast] = useState("");
    const [error, setError] = useState(null);


    useEffect(() => {
      const getforeCast = async () => {
        try {
          const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
          const data = await res.json();
          console.log("foreCast",data)
          setForeCast(data);
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      };
  
      getforeCast(); // Call the function when the component mounts or when city or apiKey changes
    }, []);

    if (error) {
      return <div>Error: {error}</div>;
    }
  
    console.log("Forecast data:", foreCast);
  return (
    <section className='py-3'>
      <h2 className='text-xl font-extrabold'>5-Day Forecast:</h2>

      {foreCast && (
        <p>Temperature: {foreCast.list[0].main.temp} °C</p>
      )}
     
    </section>
  )
}

export default ForeCast