import React, {useState, useEffect} from 'react'
import click1 from './click1.wav';
const clickOne = new Audio(click1)



const useMetronome = () => {
    const [bpm, setBpm] = useState(120);
    const [isPlaying, setIsPlaying] = useState(false);

  
    useEffect(() => {
      let timer;
      if (isPlaying) {
        timer = setInterval(() => clickOne.play(), (60 / bpm) * 1000);
      }
      return () => clearInterval(timer);
    }, [bpm, isPlaying]);

    return { bpm, setBpm, isPlaying, setIsPlaying };
  };


  export default useMetronome