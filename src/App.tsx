import React , { useEffect, useRef, useState } from 'react'
import './App.css'
import CountDownInput from './components/CountdownInput';

let countdown: number;

function App() {
  const [isCountDownStarted , setIsCountDownStarted] = useState(false);
  const [hour , setHour] = useState<string>('')
  const [min , setMinute] = useState<string>('')
  const [sec , setSecond] = useState<string>('')

  const hourRef = useRef<HTMLInputElement>(null)
  const minuteRef = useRef<HTMLInputElement>(null)
  const secondRef = useRef<HTMLInputElement>(null)
  
  const handleHours = (value: string): void => {
    setHour(value)
  }

  const handleMinutes = (value: string): void => {
    setMinute(value)
  }

  const handleSeconds = (value: string): void => {
    setSecond(value)
  }

  const handleStartButton = (): void => {
      if(+sec >= 60) {
        setSecond((+sec%60).toString())
        setMinute((prev) => Math.floor(( +prev + +sec/60)).toString())
      }
      if(+min >= 60) {
        setMinute((+min%60).toString())
        setHour((prev) => Math.floor(( +prev + +min/60)).toString())
      }

      setIsCountDownStarted(true)
      let countdownHours = +hour;let countdownMinutes = +min; let countdownSeconds = +sec%60;
      countdown = setInterval(() => {
        if( countdownHours === 0 && countdownMinutes === 0 && countdownSeconds === 0){
          setIsCountDownStarted(false)
          clearInterval(countdown)
          alert('CountDown is finised')
          return;
        }   
        if(countdownSeconds === 0) {
          if(countdownMinutes === 0 && countdownHours > 0) {
              setMinute('60')
              countdownMinutes = 60;
              countdownHours--;
              countdownHours < 10 ? setHour(`0${countdownHours}`) : setHour(countdownHours.toString());
          }   
          setSecond('59')
          countdownSeconds = 59;
          countdownMinutes--; 
          countdownMinutes < 10 ? setMinute(`0${countdownMinutes}`) : setMinute(countdownMinutes.toString());
          
        } else {
          countdownSeconds--;
          if(countdownSeconds < 10) {
            setSecond(`0${countdownSeconds}`)
          } else{
            setSecond(countdownSeconds.toString())
          }
        }
      } , 1000)

  }

  const handlePauseButton = (): void => {
    clearTimeout(countdown)
    setIsCountDownStarted(false)
  }

  const handleResetButton = (): void => {
      setIsCountDownStarted(false)
      clearInterval(countdown)
      countdown = 0;
      setHour('00')
      setMinute('00')
      setSecond('00')
  }

  const handleKeyDown = (e: any) => {
    if(e.key === 'Enter') {
      handleStartButton()
    } 
    if(e.key === 'Backspace') {
      handleResetButton()
    }
  }

  useEffect(() => {
    hourRef?.current?.focus();
  }, [])

  return (
    <div className='mainContainer' >
      <h2>Countdown - React</h2>
      <div className='container'>
        <div className='input-container'>
          <CountDownInput ref={hourRef} value={hour} placeholder='00' onHandleChange={handleHours} />
          <span>:</span>
          <CountDownInput ref={minuteRef} value={min} placeholder='00' onHandleChange={handleMinutes} />
          <span>:</span>
          <CountDownInput ref={secondRef} value={sec} placeholder='00' onHandleChange={handleSeconds} />
        </div>
        <div className='button-container'>
            {!isCountDownStarted ? <button type='button' className='button start' onKeyDown={handleKeyDown}  onClick={handleStartButton}>Start</button> :
                <button type='button' className='button pause' onKeyDown={handleKeyDown}  onClick={handlePauseButton}>Pause</button>
            }<button type='button' className='button reset' onClick={handleResetButton}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App
