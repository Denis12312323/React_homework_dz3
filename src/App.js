import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

//Timer
const Timer = ({ seconds = 10 }) => {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pause) {
        setTimeLeft(prevTimeLeft => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [pause])

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div>
      <div>{formatTime(timeLeft)}</div>
      <button
        onClick={() => setPause(!pause)}>{pause ? "Resume" : "Pause"}</button>
    </div>
  )
}
//TimerControl
const SecondsTimer = ({ seconds }) => <h2>{seconds}</h2>;
const TimerControl = () => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timerStart, setTimerStart] = useState(false)


  return (
    <div>
      <h2>TimerControl</h2>
      <div>
        <lable>Години</lable>
        <input
          type='number'
          value={hours}
          onChange={e => setHours(parseInt(e.target.value))}></input>
      </div>
      <div>
        <lable>Хвилини</lable>
        <input
          type='number'
          value={minutes}
          onChange={e => setMinutes(parseInt(e.target.value))}></input>
      </div>
      <div>
        <lable>Секунди</lable>
        <input
          type='number'
          value={seconds}
          onChange={e => setSeconds(parseInt(e.target.value))}></input>
        <button onClick={() => setTimerStart(true)}>Start</button>
        {timerStart && <Timer seconds={hours * 3600 + minutes * 60 + seconds}></Timer>}
      </div>

    </div>
  )
}
//TimerContainer

const TimerContainer = ({ seconds, refresh, render: RenderComponent }) => {
  const [currentTime, setCurrentTime] = useState(seconds)

  useEffect(() => {
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, seconds - Math.floor(elapsedTime / 1000))
      setCurrentTime(remainingTime)
    }, refresh);


    return () => clearInterval(timer)
  }, [seconds, refresh])

  return (
    <div>
      <RenderComponent seconds={currentTime}></RenderComponent>
    </div>
  )
}

//LCD
const TimerLCD = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds)

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  })

  return (
    <div>
      <h2>LCD</h2>
      <div>{formatTime(timeLeft)}</div>
    </div>
  )
}

//Watch
const Watch = ({ hours, minutes, seconds }) => {
  const h = (360 / 12) * (hours % 12) + (360 / 12) * (minutes / 60)
  const m = (360 / 60) * minutes + (360 / 60) * (seconds / 60)
  const s = (360 / 60) * seconds

  const hStyle = {
    transform: `rotate(${h}deg)`,
  }
  const mStyle = {
    transform: `rotate(${m}deg)`,
  }
  const sStyle = {
    transform: `rotate(${s}deg)`,
  }
  return (
    <div>
      <h2>Watch</h2>
      <div className='container-watch'>
        <img src={'http://draw.asmer.fe.a-level.com.ua/ClockFace/ClockFace.png'}></img>
        <img src={'http://draw.asmer.fe.a-level.com.ua/ClockFace/ClockFace_H.png'} className='watch-h' style={{ ...hStyle }}></img>
        <img src={'http://draw.asmer.fe.a-level.com.ua/ClockFace/ClockFace_M.png'} className='watch-m' style={{ ...mStyle }}></img>
        <img src={'http://draw.asmer.fe.a-level.com.ua/ClockFace/ClockFace_S.png'} className='watch-s' style={{ ...sStyle }}></img>
      </div>
    </div>
  )
}
const TimerContainerWatch = ({ seconds, refresh, render: RenderComponent }) => {
  const [currentTime, setCurrentTime] = useState(seconds);

  useEffect(() => {
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, seconds - Math.floor(elapsedTime / 1000));
      setCurrentTime(remainingTime);
    }, refresh);

    return () => clearInterval(timer);
  }, [seconds, refresh]);

  const hours = Math.floor(currentTime / 3600);
  const minutes = Math.floor((currentTime % 3600) / 60);
  const secondsLeft = currentTime % 60;

  return <RenderComponent hours={hours} minutes={minutes} seconds={secondsLeft} />;
}
//TimerControl + TimerContainer

const TimerControlContainer = () => {
  return (
    <div>
      <h2>TimerControl + TimerContainer</h2>
    <TimerContainer seconds={100} refresh={1000} render={Timer}/>
    </div>
  )
}




function App() {
  return (
    <div className="App">
      <Timer seconds={100}></Timer>

      <TimerControl></TimerControl>
      <h2>TimerContainer</h2>
      <TimerContainer seconds={1800} refresh={100} render={SecondsTimer} />
      <TimerLCD seconds={1800}></TimerLCD>
      <TimerContainerWatch seconds={1800} refresh={1000} render={Watch}></TimerContainerWatch>
      <TimerControlContainer/>
    </div>
  );
}

export default App;
