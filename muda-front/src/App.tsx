import React, { useState } from "react";
import "./App.css";
import ConsoleMode, { ConsoleTab } from "./consoleMode";
import PianoMode, { PianoBase } from "./pianoMode";

function App() {
  const [showConsole, setShowConsole] = useState<boolean>(true);
  const [finShowConsole, setFinShowConsole] = useState<boolean>(true);
  const [showPiano, setShowPiano] = useState<boolean>(false);
  const [finShowPiano, setFinShowPiano] = useState<boolean>(false);

  function handleClick() {
    if (showConsole) {
      // コンソールを縮める
      setShowConsole(false);
      setFinShowConsole(false);
      // ピアノを広げる
      setShowPiano(true);
      // コンソールを縮め切ったら消す
      setTimeout(() => {
        setFinShowPiano(true);
      }, 2000);
    } else {
      // コンソールを広げる
      setFinShowPiano(false);
      setShowConsole(true);
      // ピアノを縮める
      setShowPiano(false);
      // ピアノを縮め切ったら消す
      setTimeout(() => {
        setFinShowConsole(true);
      }, 2000);
    }
  }
  return (
    <div className="App" onClick={handleClick}>
      {!finShowPiano && <ConsoleMode doRemove={!showConsole} />}
      <ConsoleTab />
      {!finShowConsole && <PianoMode doRemove={!showPiano} />}
      <PianoBase />
    </div>
  );
}

export default App;
