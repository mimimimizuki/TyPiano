import React from "react";
import "./App.css";
import ConsoleMode from "./consoleMode";
import Header from "./Header";
import PianoMode from "./pianoMode";

function App() {
  return (
    <div className="App">
      <Header />
      <ConsoleMode />
      <PianoMode />
    </div>
  );
}

export default App;
