import React, {useState} from 'react'
import './metronome.css'
import useMetronome from './useMetronome'

const Metronome = () => {
  const { bpm, setBpm, isPlaying, setIsPlaying } = useMetronome();

  const [count, setCount] = useState(0)
  const [timeFirst, setTimeFirst] = useState()
  const [timePrevious, setTimePrevious] = useState()
  const timeSeconds = new Date();
  const time = timeSeconds.getTime();

  const calculateBpm = () => {

    if (timePrevious !== 0 && time - timePrevious > 3000) {

      setCount(0)
      setTimePrevious(time)
      return false;
    }
    //if first click set the initial time and count 
    if (count === 0) {
  
      setTimeFirst(time)
      setCount(count + 1)
    } else {
 
      const bpmAvg = (60000 * count) / (time - timeFirst);
      let newBpm = Math.round(bpmAvg * 100) / 100;
      // range of input is set to max of 240, so allowing it to go higher would look weird.
      setBpm(newBpm > 240 ? 240 : newBpm)
      setCount(count + 1)
      setTimePrevious(time)
    }
    
}


return (
<div className="metronome-container">
    <div className="metronome">
    <div className="bpm-slider">
      <div className="bpmText">{bpm} BPM</div>
      <input
        type="range"
        min="60"
        max="240"
        value={bpm}
        onChange={e => setBpm(e.target.value)} />
    </div>
    
    <button onClick={() => setIsPlaying(!isPlaying)} className="startButton">
      {isPlaying ? 'Stop' : 'Start'}
    </button>
    <button className="bpmButton" onMouseDown={calculateBpm}>{bpm}</button>
  </div>
</div>
)

}


export default Metronome