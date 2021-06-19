import { useState, useEffect } from "react";
import playNote from "./util/playNote";
import * as keyCodeList from "./common/keyCode";
import * as noteConfig from "./common/noteConfig"

type nowGotted = "d" | "r" | "m" | "f" | "s" | "sh" | "#d" | "#r" | "#f" | "#s" | "none";
type note = "do" | "re" | "mi" | "fa" | "so" | "ra" | "shi" | "#do" | "#re" | "#fa" | "#so" | "#ra" | "none" ;

const useReceiveKeyEnter = (): [note,number] => {
  const [receivedKey, setReceivedKey] = useState<nowGotted>("none");
  const [isSharp , setSharp] = useState(false);
  const [note, setNote] = useState<note>("none");
  const [counter, setCounter] = useState<number>(0);
  const [nowCounter, setNowCounter] = useState(0);

  useEffect(() => {
    function setFromNone(event: { keyCode: number | Number }) {
      const keyCode = event.keyCode;
      setNote("none");
      var oneNote = ""
      if (keyCode == keyCodeList.sharp_code) {
        setSharp(true);
      } else if (keyCode == keyCodeList.downOctave_code) {
        setCounter(counter-1);
      } else if (keyCode == keyCodeList.upOctave_code) {
        setCounter(counter+1)
      } else if (keyCode === keyCodeList.d_code) {
        if (isSharp) {
          setReceivedKey("#d");
        } else{
          setReceivedKey("d");
        }
      } else if (keyCode === keyCodeList.r_code) {
        if (isSharp) {
          setReceivedKey("#r");
        } else{
          setReceivedKey("r");
        }
      } else if (keyCode === keyCodeList.m_code) {
        setReceivedKey("m");
      } else if (keyCode === keyCodeList.f_code) {
        if (isSharp){
          setReceivedKey("#f");
        } else{
          setReceivedKey("f");
        }
      } else if (keyCode === keyCodeList.s_code) {
        if (isSharp) {
          setReceivedKey("#s");
        } else{
          setReceivedKey("s");
        }
      } else if (keyCode === keyCodeList.h_code && receivedKey === "s") {
        setReceivedKey("sh");
      } else if (keyCode === keyCodeList.o_code && receivedKey === "d") {
        setNowCounter(counter);
        setCounter(0);
        if (isSharp){
          setNote("#do");
          oneNote = "#do"
          setSharp(false);
        } else{
          setNote("do");
          oneNote = "do"
        }
        playNote(oneNote,nowCounter, noteConfig.noteLength);
        setReceivedKey("none");
      } else if (keyCode === keyCodeList.o_code && receivedKey === "s") {
        setNowCounter(counter);
        setCounter(0);
        if (isSharp){
          setNote("#so");
          oneNote = "#so"
          setSharp(false);
        } else{
          setNote("so");
          oneNote = "so"
        }
        playNote(oneNote,nowCounter, noteConfig.noteLength);
        setReceivedKey("none");
      } else if (keyCode === keyCodeList.e_code && receivedKey === "r") {
        setNowCounter(counter);
        setCounter(0);
        if (isSharp){
          setNote("#re");
          oneNote = "#re"
          setSharp(false);
        } else{
          setNote("re");
          oneNote = "re"
        }
        playNote(oneNote, nowCounter, noteConfig.noteLength)
        setReceivedKey("none");
      } else if (keyCode === keyCodeList.i_code && receivedKey === "m") {
        setNowCounter(counter);
        setCounter(0);
        setSharp(false);
        setNote("mi");
        oneNote = "mi"
        playNote(oneNote,nowCounter, noteConfig.noteLength);
        setReceivedKey("none");
      } else if (keyCode === keyCodeList.i_code && receivedKey === "sh") {
        setNowCounter(counter);
        setCounter(0);
        setSharp(false);
        setNote("shi");
        oneNote = "shi"
        playNote(oneNote,nowCounter, noteConfig.noteLength);
        setReceivedKey("none");
      } else if (keyCode === keyCodeList.a_code && receivedKey === "f") {
        setNowCounter(counter);
        setCounter(0);
        if (isSharp){
          setNote("#fa");
          oneNote = "#fa"
          setSharp(false);
        } else{
          setNote("fa");
          oneNote = "fa"
        }
        playNote(oneNote,nowCounter, noteConfig.noteLength);
        setReceivedKey("none");
      } else if (keyCode === keyCodeList.a_code && receivedKey === "r") {
        setNowCounter(counter);
        setCounter(0);
        if (isSharp){
          setNote("#ra");
          oneNote = "#ra"
          setSharp(false);
        } else{
          setNote("ra");
          oneNote = "ra"
        }
        playNote(oneNote,nowCounter, noteConfig.noteLength);
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
  return [note, nowCounter];
};

export default useReceiveKeyEnter;
