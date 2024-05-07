import React, {useState, useEffect, useRef} from 'react';

function App() {
  const [isRunning,setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if(isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }
  }, [isRunning])

  function start() {
    setRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    console.log(startTimeRef)
  }

  function stop() {
    setRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setRunning(false)
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}: ${minutes}: ${seconds}: ${milliseconds}`
  }

  return (
    <div className='mainDiv'>
      <h1>{formatTime()}</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>      
    </div>
  )
}

export default App
