import React from 'react'

const ForeCast = (city,apiKey) => {

    const [foreCast, setForeCast] = useState("");

    const getforeCast = async()=>{
        const res = await fetch(`api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
       const data = await res.json()
       console.log(data)
       setForeCast(data)
   
    }
  return (
    <section className='py-3'>
         <h2 className='text-xl font-extrabold'>5-Day Forecast:</h2>

    </section>
  )
}

export default ForeCast