import React, { useState, useEffect } from "react";
import play from "./play_function"

type nowGotted = "d" | "r" | "m" | "f" | "s" | "sh" | "#d" | "#r" | "#f" | "#s" | "none";
type note = "do" | "re" | "mi" | "fa" | "so" | "ra" | "shi" | "#do" | "#re" | "#fa" | "#so" | "#ra" | "none" ;

const ReceiveKeyEnter: React.FC = () => {
  const [receivedKey, setReceivedKey] = useState<nowGotted>("none");
  const [isSharp , setSharp] = useState(false);
  const [note, setNote] = useState<note>("none");
  const [counter, setCounter] = useState(0);

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
        const nowCount = counter + 1
        setCounter(nowCount)
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
        const nowCounter = counter;
        console.log(nowCounter)
        setCounter(0);
        if (isSharp){
          setNote("#do");
          play(49+nowCounter*12,1);
          setSharp(false);
        } else{
          setNote("do");
          play(48+nowCounter*12,1);
        }
        setReceivedKey("none");
      } else if (keyCode === o && receivedKey === "s") {
        const nowCounter = counter;
        setCounter(0);
        if (isSharp){
          setNote("#so");
          play(56+nowCounter*12,1);
          setSharp(false);
        } else{
          setNote("so");
          play(55+nowCounter*12,1);
        }
        setReceivedKey("none");
      } else if (keyCode === e && receivedKey === "r") {
        const nowCounter = counter;
        setCounter(0);
        if (isSharp){
          setNote("#re");
          play(51+nowCounter*12,1);
          setSharp(false);
        } else{
          setNote("re");
          play(50+nowCounter*12,1);
        }
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "m") {
        const nowCounter = counter;
        setCounter(0);
        setSharp(false);
        setNote("mi");
        play(52+nowCounter*12,1);
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "sh") {
        const nowCounter = counter;
        setCounter(0);
        setSharp(false);
        setNote("shi");
        play(59+nowCounter*12,1);
        setReceivedKey("none");
      } else if (keyCode === a && receivedKey === "f") {
        const nowCounter = counter;
        setCounter(0);
        if (isSharp){
          setNote("#fa");
          play(54+nowCounter*12,1);
          setSharp(false);
        } else{
          setNote("fa");
          play(53+nowCounter*12,1);
        }
        setReceivedKey("none");
      } else if (keyCode === a && receivedKey === "r") {
        const nowCounter = counter;
        setCounter(0);
        if (isSharp){
          setNote("#ra");
          play(58+nowCounter*12,1);
          setSharp(false);
        } else{
          setNote("ra");
          play(57+nowCounter*12,1);
        }
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

  return <div>{note}</div>;
};

export default ReceiveKeyEnter;
