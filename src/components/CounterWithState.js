import { useState, useRef } from 'react';
import React from 'react'

const CounterWithState = () => {
    const [number, setNumber] = useState(0);
    const intervalRef = useRef(null);
  
    const updateNumber = (a) => {
      let n = number;
      if(a === "inc") {
        n = n+1;
        setNumber(n)
      }else if(a === "dec") {
        n = n-1;
        setNumber(n)
      }else if(a === "res") {
        setNumber(0)
      }
    }
  
    const startCounter = () => {
      intervalRef.current = setInterval(() => {
        setNumber((prev) => {
          if(prev === 5){   
            clearInterval(intervalRef.current)
            intervalRef.current = null
            return prev
          }
          return prev + 1
        } );
      }, 1000);
  
    }
  
    return (
      <div className="container text-center">
        <div className="row align-items-start">
          <div className='col'>
            <button className='btn btn-success' onClick={() => startCounter()}>Start</button>
          </div>
          <div className='col'>
            <button className='btn btn-primary' onClick={() => updateNumber("dec")}>Decrement - </button>
          </div>
          <div className='col'>
            <span id='number'>{number}</span>
          </div>
          <div className='col'>
            <button className='btn btn-primary' onClick={() => updateNumber("inc")}> + Increment</button>
          </div>
          <div className='col'>
            <button className='btn btn-danger' onClick={() => updateNumber("res")}>Reset</button>
          </div>
        </div>
      </div>
    );
}

export default CounterWithState