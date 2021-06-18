import { useState, useEffect } from "react";

type nowGotted = "d" | "r" | "m" | "f" | "s" | "sh" | "#d" | "#r" | "#f" | "#s" | "none";
type note = "do" | "re" | "mi" | "fa" | "so" | "ra" | "shi" | "#do" | "#re" | "#fa" | "#so" | "#ra" | "none" ;

const useReceiveKeyEnter = (): note => {
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
      if (keyCode === sharp){
        setSharp(true);
      } else if (keyCode == downOctave) {
        setCounter(counter-1);
      } else if (keyCode == upOctave) {
        setCounter(counter+1)
      } else if (keyCode === d) {
        if (isSharp){
          setReceivedKey("#d")
        } else{
          setReceivedKey("d");
        }
      } else if (keyCode === r) {
        if (isSharp){
          setReceivedKey("#r")
        } else{
          setReceivedKey("r");
        }
      } else if (keyCode === m) {
        setReceivedKey("m");
      } else if (keyCode === f) {
        if (isSharp){
          setReceivedKey("#f")
        } else{
          setReceivedKey("f");
        }
      } else if (keyCode === s) {
        if (isSharp){
          setReceivedKey("#s")
        } else{
          setReceivedKey("s");
        }
      } else if (keyCode === h && receivedKey === "s") {
        setReceivedKey("sh");
      } else if (keyCode === o && receivedKey === "d") {
        if (isSharp){
          setNote("#do");
          setSharp(false);
        } else{
          setNote("do");
        }
        setReceivedKey("none");
      } else if (keyCode === o && receivedKey === "s") {
        if (isSharp){
          setNote("#so");
          setSharp(false);
        } else{
          setNote("so");
        }
        setReceivedKey("none");
      } else if (keyCode === e && receivedKey === "r") {
        if (isSharp){
          setNote("#re");
          setSharp(false);
        } else{
          setNote("re");
        }
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "m") {
        setNote("mi");
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "sh") {
        setNote("shi");
        setReceivedKey("none");
      } else if (keyCode === a && receivedKey === "f") {
        if (isSharp){
          setNote("#fa");
          setSharp(false);
        } else{
          setNote("fa");
        }
        setReceivedKey("none");
      } else if (keyCode === a && receivedKey === "r") {
        if (isSharp){
          setNote("#ra");
          setSharp(false);
        } else{
          setNote("ra");
        }
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

  return note;
};

export default useReceiveKeyEnter;
