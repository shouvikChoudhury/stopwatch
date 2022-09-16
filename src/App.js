import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const increaseEverySecond = useRef(null)

  const handleStart = () => {
    increaseEverySecond.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
    setIsActive(true)
    setIsPaused(true)
  }

  const handlePause = () => {
    clearInterval(increaseEverySecond.current)
    setIsPaused(false)
  }

  const handleResume = () => {
    increaseEverySecond.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
    setIsPaused(true)
  }

  const handleReset = () => {
    clearInterval(increaseEverySecond.current)
    setTimer(0)
    setIsActive(false)
    setIsPaused(false)
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const getMinutes = `0${Math.floor(timer / 60) % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }
  return (
    <div className="app">
      <h3>Stop-Watch</h3>
      <div className='stopwatch-card'>
        <p>{formatTime()}</p>
        <div className='buttons'>
          {
            !isActive && !isPaused ?
              <button onClick={handleStart}>Start</button>
              : (
                isPaused ? <button onClick={handlePause}>Pause</button> :
                  <button onClick={handleResume}>Resume</button>
              )
          }
          <button onClick={handleReset} disabled={!isActive}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
