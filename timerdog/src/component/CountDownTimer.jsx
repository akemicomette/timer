import {useState, useEffect} from "react";
import Timer from "./Timer";
import {BsFillPlayFill, BsPauseFill, BsStopFill} from "react-icons/bs"

export default function CountDownTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(null);

  const[showEndScreen, setShowEndScreen] = useState({
    show: false,
    message: 'Que tipo de carro o Yoda dirige? Toyoda.',
  })

  useEffect(() => {
    let interval;
    if(isRunning) {
      interval = setInterval (() => {
        if(seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes -1);
          setSeconds(59);
        }
      },1000);
    }

    if(minutes === 0 && seconds === 0 ) {
      setShowEndScreen({ ...showEndScreen, show:true });
      resetTimer();
    }

    return () => clearInterval(interval);
  }, [seconds, minutes, isRunning, showEndScreen.show]);


  function startTimer() {
    if(minutes !== 0 || seconds !== 0 ) {
      setIsRunning(true);
      setShowEndScreen({... showEndScreen, show: false});
    } else {
      alert('Insira o tempo desejado');
    }
  }

  function pauseTimer() {
    setIsRunning(false);
  }


  function stopTimer() {
    resetTimer();
    setShowEndScreen({...showEndScreen, show: false });
  }
  
  function resetTimer() {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
  }

  const changeSeconds = (e) => {
    setSeconds(e.target.value);
  }

  const changeMinutes = (e) => {
    setMinutes(e.target.value);
  }

  return (
    <div>
      {showEndScreen.show && <h1 className="title">{showEndScreen.message}</h1>}
      <Timer 
      seconds={seconds} 
      minutes={minutes} 
      changeSeconds={changeSeconds} 
      changeMinutes={changeMinutes} 
      />

      <br/>
      {!isRunning && (
        <button className="btn btn-play btn-lg" onClick={startTimer}>
          <BsFillPlayFill/>
        </button>
      )}
       {isRunning && (
        <button className="btn btn-pause btn-lg" onClick={pauseTimer}>
          <BsPauseFill/>
        </button>
      )}
      <button className="btn btn-stop btn-lg" onClick={stopTimer}>
        <BsStopFill />
      </button>
    </div>
  )
}