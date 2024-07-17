import PropTypes from "prop-types";
import { BsStopwatch } from "react-icons/bs"

function Timer({ seconds, minutes, changeSeconds, changeMinutes}) {
  return (
    <div className="timerWrapper">
      <BsStopwatch className="stop-watch" />
      <div className="d-flex flex-column">
        <label className="units">MM</label>
        <input className="camp" type="text" value={minutes} onChange={changeMinutes}></input>
      </div>
      <div className="d-flex flex-column">
        <label className="units">SS</label>
        <input className="camp" type="text" value={seconds} onChange={changeSeconds}></input>
      </div>
    </div>
  )
}

Timer.propTypes = {
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  changeSeconds: PropTypes.func.isRequired,
  changeMinutes: PropTypes.func.isRequired,
};

export default Timer;