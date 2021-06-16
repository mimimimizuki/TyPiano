import React from "react";
import "./App.css";
import ConsoleMode from "./consoleMode";
import PianoMode from "./pianoMode";

function App() {
  return (
    <div className="App">
      <ConsoleMode />
      <PianoMode />
    </div>
  );
}

export default App;
