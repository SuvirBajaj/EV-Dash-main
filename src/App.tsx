import { Box, Stack, Typography } from '@mui/material';
import {CircularProgressbar} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import React, { useEffect, useState } from 'react';
import './App.css';
import { BatteryMeter } from './components/BatteryMeter';
import BatteryBar from './components/BatteryBar';
import { CurrentDrawBar } from './components/CurrentDrawBar';
import buildStyles from './components/buildStyles';

function App() {
  //initializes the states of the objects on the dash
  const [ currentDraw, setCurrentDraw ] = useState(65);
  const [ speed, setSpeed ] = useState(90);
  const [battery, setBattery] = useState(50);
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimeOn] = React.useState(false);
  const [clockState, setClockState] = useState("currDateTime");
  var bms_fault = true;
  var imd_fault = true;
  var bspd_fault = true;
  var accelerate = false;
  //runs a 0-60 demo showing the speed increasing and decreasing
  const simulateSpeed = (speed: any) => {
    var new_speed = 0;
    if(speed == 60){
      accelerate = false;
    }
    if(speed == 0){
      accelerate = true;
    }
    if(accelerate == true)
    {
      new_speed = speed + 1;
    }
    else
    {
      new_speed = speed - 1;
    }
    return new_speed;
  }
  // calculates the battery color depending on battery charge level
  const calcColor = (percent: any, start: any, end: any) => {
    let a = percent / 100,
    b = (end - start) * a,
    c = b + start;

    return "hsl(" + c + ", 100%, 50%)";
}



  //current animation demo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDraw(currentDraw + (Math.random()*1) - .5); 
      setSpeed(speed + (Math.random()*1) - .5);
      const date = new Date();
      if(timerOn){
        setTime(prevTime => prevTime + 50);
      }
      //setClockState(date.toLocaleTimeString());
      // setBattery(battery + (Math.random()*1) - .5);
    }, 50);
    // let interval: any;

    // if (timerOn) {
    //   interval = setInterval(() => {
    //     setTime(prevTime => prevTime + 10)
    //   }, 10)
    // } else {
    //   clearInterval(interval)
    // }
    
    return () => {
      clearInterval(timer);
    };
  }), [timerOn];

  return (
    <div className="App" style={{display: "flex", justifyContent: "center"}}>
      <Box paddingTop="20px">
        <Stack spacing={2}>
          {/* <Typography variant='h4' component='h4' color='white'>{clockState}</Typography> */}
          <Box>
            <Typography variant='h3' component='h1' color='white'>Current Draw</Typography>
            <CurrentDrawBar currentDraw={currentDraw}/>
          </Box>
          <Box sx={{textAlign: 'center'}}>
            <Typography variant='h3' component='h1' color='white'>Speed</Typography>
            <Stack direction='row' justifyContent="center">
              <Typography variant='h2' component='h2' color='white'>{Math.round(speed)}</Typography>
              <Typography variant='h5' component='h2' color='white'> mph</Typography>
            </Stack>
          </Box>
          <Box style={{display: "flex", justifyContent: "center", height: 350, paddingTop: 25}}>
            <CircularProgressbar
              value={battery}
              text={`${Math.round(battery)}%`}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: "butt",
                trailColor: "#eee",
                textColor: "#eee",
                pathColor: calcColor(battery, 0, 120)
              })}
            />
          </Box>
          <div>
            <Stack direction='row' justifyContent="center">
              <Typography variant='h3' component='h4' color='white'>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</Typography>
              <Typography variant='h3' component='h4' color='white'>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</Typography>
              <Typography variant='h3' component='h4' color='white'>{("0" + ((time / 10) % 100)).slice(-2)}</Typography>
            </Stack>
          </div>
          <div>
            {!timerOn && time === 0 && (
              <button onClick={() => setTimeOn(true)} className="timeBtns">Start</button>
            )}
            {timerOn && (
              <button onClick={() => setTimeOn(false)} className="timeBtns">Stop</button>
            )}
            {!timerOn && time != 0 && (
              <button onClick={() => setTimeOn(true)} className="timeBtns">Resume</button>
            )}
            {!timerOn && time > 0 && (
              <button onClick={() => setTime(0)} className="timeBtns">Reset</button>
            )}
          </div>
          {/* <BatteryMeter height={200} width={85} percent={100}></BatteryMeter> */}
          <Box sx={{textAlign: 'center', display: 'inline'}}>
            <Stack direction='row' justifyContent="center">
              <Typography variant='h5' className = 'neonText' sx={{padding: '15px'}}>IMD</Typography>
              <Typography variant='h5' className = 'neonText' sx={{padding: '15px'}}>BMS</Typography>
              <Typography variant='h5' className = 'neonText' sx={{padding: '15px'}}>BSPD</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
    
  );
}

export default App;
