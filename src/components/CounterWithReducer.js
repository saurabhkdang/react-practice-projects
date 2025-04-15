import { useRef, useReducer, useEffect } from 'react';
import React from 'react'

const initialState = {
    number:  Number(localStorage.getItem("counter")),
    isRunning: false,
    mode: false // 0 for light, 1 for dark
}

const reducer = (state, action) => {
    switch (action.type) {
        case "inc":
            let n = state.number + 1;
            localStorage.setItem("counter", n)
            return {...state, number: n }
        case "dec":
            let n1 = state.number - 1;
            localStorage.setItem("counter", n1)
            return {...state, number: n1}
        case "res": 
            return {...state, number: 0, isRunning: false}
        case "start":
            return {...state, isRunning: true}
        case "stop":
            return {...state, isRunning: false}
        case "toggle" :
            return {...state, mode: !state.mode}
        default:
            break;
    }
}

const getBackgroundColor = (mode) => {
    return mode===false?"white":"black"
}

const CounterWithReducer = () => {
    const intervalRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
        if(state.isRunning && intervalRef.current === null) {
            intervalRef.current = setInterval(()=>{
                dispatch({type: "inc"})
            },1000)
        }

        if(state.number === 5 && intervalRef.current !== null) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            dispatch({type: "stop"})
        }

        return () => {
            if (intervalRef.current !== null && !state.isRunning) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [state.isRunning, state.number])
  
    return (
      <div className="container text-center" style={{background: getBackgroundColor(state.mode)}}>
        <div className="row align-items-start">
            <div className='col'>
                <button className='btn btn-info' onClick={() => dispatch({type: "toggle"})}>Dark/Light</button>
            </div>
            <div className='col'>
                <button className='btn btn-success' onClick={() => dispatch({type: "start"})}>Start</button>
            </div>
            <div className='col'>
                <button className='btn btn-primary' onClick={() => dispatch({type: "dec"})}>Decrement - </button>
            </div>
            <div className='col'>
                <span id='number'>{state.number}</span>
            </div>
            <div className='col'>
                <button className='btn btn-primary' onClick={() => dispatch({type: "inc"})}> + Increment</button>
            </div>
            <div className='col'>
                <button className='btn btn-danger' onClick={() => dispatch({type: "res"})}>Reset</button>
            </div>
        </div>
      </div>
    );
}

export default CounterWithReducer