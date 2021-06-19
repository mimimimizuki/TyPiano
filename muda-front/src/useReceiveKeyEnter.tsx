import { useState, useEffect } from "react";
import playNote from "./until/playNote";

type nowGotted = "d" | "r" | "m" | "f" | "s" | "sh" | "#d" | "#r" | "#f" | "#s" | "none";
type note = "do" | "re" | "mi" | "fa" | "so" | "ra" | "shi" | "#do" | "#re" | "#fa" | "#so" | "#ra" | "none" ;

const useReceiveKeyEnter = (): [note,number] => {
  const [receivedKey, setReceivedKey] = useState<nowGotted>("none");
  const [isSharp , setSharp] = useState(false);
  const [note, setNote] = useState<note>("none");
  const [counter, setCounter] = useState<number>(0);
  const [nowCounter, setNowCounter] = useState(0);
  
  const sharp = 51;
  const downOctave = 188;
  const upOctave = 190;
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
      setNote("none");
      if (keyCode == sharp) {
        setSharp(true);
      } else if (keyCode == downOctave) {
        setCounter(counter-1);
      } else if (keyCode == upOctave) {
        setCounter(counter+1)
      } else if (keyCode === d) {
        if (isSharp) {
          setReceivedKey("#d");
        } else{
          setReceivedKey("d");
        }
      } else if (keyCode === r) {
        if (isSharp) {
          setReceivedKey("#r");
        } else{
          setReceivedKey("r");
        }
      } else if (keyCode === m) {
        setReceivedKey("m");
      } else if (keyCode === f) {
        if (isSharp){
          setReceivedKey("#f");
        } else{
          setReceivedKey("f");
        }
      } else if (keyCode === s) {
        if (isSharp) {
          setReceivedKey("#s");
        } else{
          setReceivedKey("s");
        }
      } else if (keyCode === h && receivedKey === "s") {
        setReceivedKey("sh");
      } else if (keyCode === o && receivedKey === "d") {
        setNowCounter(counter);
        setCounter(0);
        if (isSharp){
          setNote("#do");
          setSharp(false);
        } else{
          setNote("do");
        }
        playNote(note,nowCounter, 1);
        setReceivedKey("none");
      } else if (keyCode === o && receivedKey === "s") {
        setNowCounter(counter);
        setCounter(0);
        if (isSharp){
          setNote("#so");
          setSharp(false);
        } else{
          setNote("so");
        }
        playNote(note,nowCounter, 1);
        setReceivedKey("none");
      } else if (keyCode === e && receivedKey === "r") {
        setNowCounter(counter);
        setCounter(0);
        if (isSharp){
          setNote("#re");
          setSharp(false);
        } else{
          setNote("re");
        }
        playNote(note, nowCounter, 1)
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "m") {
        setNowCounter(counter);
        setCounter(0);
        setSharp(false);
        setNote("mi");
        playNote(note,nowCounter, 1);
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "sh") {
        setNowCounter(counter);
        setCounter(0);
        setSharp(false);
        setNote("shi");
        playNote(note,nowCounter, 1);
        setReceivedKey("none");
      } else if (keyCode === a && receivedKey === "f") {
        setNowCounter(counter);
        setCounter(0);
        if (isSharp){
          setNote("#fa");
          setSharp(false);
        } else{
          setNote("fa");
        }
        playNote(note,nowCounter, 1);
        setReceivedKey("none");
      } else if (keyCode === a && receivedKey === "r") {
        setNowCounter(counter);
        setCounter(0);
        if (isSharp){
          setNote("#ra");
          setSharp(false);
        } else{
          setNote("ra");
        }
        playNote(note,nowCounter, 1);
        setReceivedKey("none");
      } else {
        setReceivedKey("none");
        setCounter(0);
      }
    }

    document.addEventListener("keydown", setFromNone);
    return () => {
      document.removeEventListener("keydown", setFromNone);
    };
  }, [receivedKey]);
  console.log(nowCounter)
  return [note, nowCounter];
};

export default useReceiveKeyEnter;
