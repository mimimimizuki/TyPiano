import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import ConsoleMode, { ConsoleTab } from "./consoleMode";
import PianoMode, { PianoBase } from "./pianoMode";
import Top from "./Top";
import ExplainModal from "./ExplainModal";

function App() {
  const [showMain, setShowMain] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showConsole, setShowConsole] = useState<boolean>(true);
  const [finShowConsole, setFinShowConsole] = useState<boolean>(false);
  const [showPiano, setShowPiano] = useState<boolean>(true);
  const [finShowPiano, setFinShowPiano] = useState<boolean>(false);

  function toTop() {
    setShowMain(false);
  }

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
  function closeModal() {
    setOpenModal(false);
  }

  function oloseModal() {
    setOpenModal(true);
  }
  return (
    <div className="App">
      <ExplainModal isOpen={openModal} toClose={closeModal} />

      {!showMain && (
        <Top piano={toPiano} console={toConsole} openModal={oloseModal} />
      )}
      {showMain && <Header toTop={toTop} />}
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
