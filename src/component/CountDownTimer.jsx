import {useState, useEffect} from "react";
import Timer from "./Timer";
import {BsFillPlayFill, BsPauseFill, BsStopFill} from "react-icons/bs"

export default function CountDownTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const[showEndScreen, setShowEndScreen] = useState(false);

  useEffect(() => {
    let interval;
    if(isRunning) {
      interval = setInterval (() => {
        if(seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes -1);
          setSeconds(59);
        } else {
          resetTimer();
          setShowEndScreen(true);
        }
      },1000);
    }

    return () => clearInterval(interval);
  }, [seconds, minutes, isRunning, showEndScreen]);


  function startTimer() {
    if(minutes !== 0 || seconds !== 0 ) {
      setIsRunning(true);
    } else {
      alert('Insira o tempo desejado');
    }
  }

  function pauseTimer() {
    setIsRunning(false);
  }


  function stopTimer() {
    resetTimer();
    setShowEndScreen(false);
  }
  
  function resetTimer() {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
  }

  const changeSeconds = (e) => {
    setSeconds(e.target.value);
    setShowEndScreen(false);
  }

  const changeMinutes = (e) => {
    setMinutes(e.target.value);
    setShowEndScreen(false);
  }

  const getMessage = () => <h1 className="title">Que tipo de carro o Mestre Yoda dirige? TOYODA!</h1>

  return (
    <div>
      {showEndScreen && getMessage()}
      <Timer 
      seconds={seconds} 
      minutes={minutes} 
      changeSeconds={changeSeconds} 
      changeMinutes={changeMinutes} 
      />

      <br/>
      {!isRunning && (
        <button className="btn btn-play" onClick={startTimer}>
          <BsFillPlayFill/>
        </button>
      )}
       {isRunning && (
        <button className="btn btn-pause" onClick={pauseTimer}>
          <BsPauseFill/>
        </button>
      )}
      <button className="btn btn-stop " onClick={stopTimer}>
        <BsStopFill />
      </button>
    </div>
  )
}