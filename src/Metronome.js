import React, { useState } from "react";
import "./Metronome.css";

let timer = null;

export default function Metronome() {
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const audioClick1 = new Audio(
    "https://daveceddia.com/freebies/react-metronome/click1.wav"
  );

  const handleBpmChange = (event) => {
    const bpm = event.target.value;
    setBpm(bpm);

    if (playing) {
      //stop the old timer and start a new one
      clearInterval(timer);
      timer = setInterval(playClick, (60 / bpm) * 1000);
      //set the new BPM
      setBpm(bpm);
    } else {
      //just update BPM
      setBpm(bpm);
    }
  };

  const playClick = () => {
    audioClick1.play();
  };

  const startStop = () => {
    if (playing) {
      //stop the timer
      clearInterval(timer);
      setPlaying(false);
    } else {
      //start a timer with the current BPM
      timer = setInterval(playClick, (60 / bpm) * 1000);
      setPlaying(true);
      playClick();
    }
    audioClick1.play();
  };

  return (
    <div className="metronome">
      <div className="bpm-slider">
        <div>{bpm} BPM</div>
        <input
          type="range"
          min="60"
          max="240"
          onChange={handleBpmChange}
          value={bpm}
        />
      </div>
      <button onClick={startStop}>{playing ? "Stop" : "Start"}</button>
    </div>
  );
}
