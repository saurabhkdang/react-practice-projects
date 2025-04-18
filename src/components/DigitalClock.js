import React, { useEffect, useState, useMemo } from 'react'

const DigitalClock = () => {

    const [time, setTime] = useState(new Date());
    const [hour12, setHour12] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
    
        return () => clearInterval(timer); // cleanup
    }, []);

    const formattedTime = useMemo(() => {
        return time.toLocaleTimeString('en-US', {hour12})
    }, [time, hour12])

    const formattedDate = useMemo(() => {
        return time.toDateString();
    }, [time])

    return (
        <div className="d-grid gap-2 col-7 mx-auto">
            <button type="button" className="btn btn-primary btn-lg">
                {`${formattedTime} - ${formattedDate}`}
            </button>
            <input
                type="checkbox"
                className="btn-check"
                id="btn-check"
                onChange={() => setHour12(!hour12)}
                checked={hour12}
            />
            <label className="btn btn-primary" htmlFor="btn-check">
                {hour12 ? '12H' : '24H'}
            </label>
        </div>
    )
}

export default DigitalClock