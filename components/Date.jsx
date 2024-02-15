import React, { useState, useEffect } from 'react';

const newDate = () => {
    const [currentDate, setCurrentDate] = useState(null);

    useEffect(() => {
        const updateDate = () => {
            const date = new Date();
            setCurrentDate({
                day: date.toLocaleString('en-US', { weekday: 'long' }),
                month: date.toLocaleString('en-US', { month: 'long' }),
                date: date.getDate(),
                year: date.getFullYear(),
            });
        };

        updateDate();

        // const intervalId = setInterval(updateDate, 1000 * 60); // Update date every minute

        // return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div>
            {currentDate && (
                <div>
                    <p className='py-2 font-semibold'> {currentDate.day}, {currentDate.month} {currentDate.date}, {currentDate.year}</p>
                    
                </div>
            )}
        </div>
    );
};

export default newDate;
