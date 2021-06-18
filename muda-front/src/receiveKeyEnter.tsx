import React, { useState, useEffect } from "react";
import play from "./play_function"

type nowGotted = "d" | "r" | "m" | "f" | "s" | "sh" | "none";
type note = "do" | "re" | "mi" | "fa" | "so" | "ra" | "shi" | "none";

const ReceiveKeyEnter: React.FC = () => {
  const [receivedKey, setReceivedKey] = useState<nowGotted>("none");
  const [note, setNote] = useState<note>("none");

  const d = 68;
  const o = 79;
  const r = 82;
  const e = 69;
  const m = 77;
  const i = 73;
  const f = 70;
  const a = 65;
  const s = 83;
  const h = 72;

  useEffect(() => {
    function setFromNone(event: { keyCode: number | Number }) {
      const keyCode = event.keyCode;
      if (keyCode === d) {
        setReceivedKey("d");
      } else if (keyCode === r) {
        setReceivedKey("r");
      } else if (keyCode === m) {
        setReceivedKey("m");
      } else if (keyCode === f) {
        setReceivedKey("f");
      } else if (keyCode === s) {
        setReceivedKey("s");
      } else if (keyCode === h && receivedKey === "s") {
        setReceivedKey("sh");
      } else if (keyCode === o && receivedKey === "d") {
        setNote("do");
        play(48,1);
        setReceivedKey("none");
      } else if (keyCode === o && receivedKey === "s") {
        setNote("so");
        play(55,1);
        setReceivedKey("none");
      } else if (keyCode === e && receivedKey === "r") {
        setNote("re");
        play(50,1);
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "m") {
        setNote("mi");
        play(52,1);
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "sh") {
        setNote("shi");
        play(59,1);
        setReceivedKey("none");
      } else if (keyCode === a && receivedKey === "f") {
        setNote("fa");
        play(53,1);
        setReceivedKey("none");
      } else {
        setReceivedKey("none");
      }
    }

    document.addEventListener("keydown", setFromNone);
    return () => {
      document.removeEventListener("keydown", setFromNone);
    };
  }, [receivedKey]);

  return <div>{note}</div>;
};

export default ReceiveKeyEnter;
