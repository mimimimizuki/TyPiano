import { time } from "console";
import React, { useState, useEffect } from "react";
import playNote from "./until/playNote";
import toABC from "./until/toABC";

// 間隔空けるための関数
// 音を鳴らす時間をミリ秒で定義
const bpm = 120
const duration = (60000 / bpm) / 2
async function sleep(msec:any) {
    await new Promise(resolve => setTimeout(resolve, msec))
}

type nowGotted = "d" | "r" | "m" | "f" | "s" | "sh" | "none";
type note = "do" | "re" | "mi" | "fa" | "so" | "ra" | "shi" | "none";

const ReceiveKeyEnter: React.FC = () => {
  const [receivedKey, setReceivedKey] = useState<nowGotted>("none");
  const [note, setNote] = useState<note>("none");
  var noteStr = ""
  var noteABCStr = ""
  var noteTypeArray = ["do", "re", "mi", "fa", "so", "ra", "shi"]

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
  const enter = 13;

  useEffect(() => {
    function setFromNone(event: { keyCode: number | Number }) {
      const keyCode = event.keyCode;
      if (keyCode === enter) {
        var pointer = 0
        while (pointer+1 < noteStr.length) {
            if (noteStr[pointer] === " ") {
                sleep(duration/1000)
            } else {
                var oneNote = noteStr.substr(pointer, 2)
                if (oneNote === "sh" || oneNote[0] === "#") {
                    oneNote += noteStr[pointer+2]
                    pointer += 3
                } else {
                    pointer += 2
                }
                if (oneNote in noteTypeArray) {
                    noteABCStr += toABC(oneNote)
                    playNote(oneNote)
                }
            }
        }
        noteStr = ""
        setReceivedKey("none");
      } else if (keyCode === d) {
        noteStr += "d"
        setReceivedKey("d");
      } else if (keyCode === r) {
        noteStr += "r"
        setReceivedKey("r");
      } else if (keyCode === m) {
        noteStr += "m"
        setReceivedKey("m");
      } else if (keyCode === f) {
        noteStr += "f"
        setReceivedKey("f");
      } else if (keyCode === s) {
        noteStr += "s"
        setReceivedKey("s");
      } else if (keyCode === h && receivedKey === "s") {
        noteStr += "h"
        setReceivedKey("sh");
      } else if (keyCode === o && receivedKey === "d") {
        noteStr += "o"
        setNote("do");
        setReceivedKey("none");
      } else if (keyCode === o && receivedKey === "s") {
        noteStr += "o"
        setNote("so");
        setReceivedKey("none");
      } else if (keyCode === e && receivedKey === "r") {
        noteStr += "e"
        setNote("re");
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "m") {
        noteStr += "i"
        setNote("mi");
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "sh") {
        noteStr += "i"
        setNote("shi");
        setReceivedKey("none");
      } else if (keyCode === a && receivedKey === "f") {
        noteStr += "a"
        setNote("fa");
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
