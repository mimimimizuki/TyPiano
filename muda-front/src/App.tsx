import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import ConsoleMode, { ConsoleTab } from "./consoleMode";
import PianoMode, { PianoBase } from "./pianoMode";
import Top from "./Top";

function App() {
  const [showMain, setShowMain] = useState<boolean>(false);
  const [showConsole, setShowConsole] = useState<boolean>(true);
  const [finShowConsole, setFinShowConsole] = useState<boolean>(false);
  const [showPiano, setShowPiano] = useState<boolean>(true);
  const [finShowPiano, setFinShowPiano] = useState<boolean>(false);

  function toConsole() {
    setShowMain(true);
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
  function toPiano() {
    setShowMain(true);
    // コンソールを縮める
    setShowConsole(false);
    setFinShowConsole(false);
    // ピアノを広げる
    setShowPiano(true);
    // コンソールを縮め切ったら消す
    setTimeout(() => {
      setFinShowPiano(true);
    }, 2000);
  }
  function handleClick() {
    if (showConsole) {
      toPiano();
    } else {
      toConsole();
    }
  }
  return (
    <div className="App">
      {!showMain && <Top piano={toPiano} console={toConsole} />}
      {showMain && <Header />}
      {showMain && (
        <div onClick={handleClick}>
          {!finShowPiano && <ConsoleMode doRemove={!showConsole} />}
          <ConsoleTab inConsole={finShowConsole} />
          {!finShowConsole && <PianoMode doRemove={!showPiano} />}
          <PianoBase inPiano={finShowPiano} />
        </div>
      )}
    </div>
  );
}

export default App;
