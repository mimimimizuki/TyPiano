import React, { useState, useEffect } from "react";
import playNote from "./until/playNote";
import toABC from "./until/toABC";
import sleep from "./until/sleep";

const bpm = 120
const duration = (60000 / bpm) / 2

const useConsoleKeyEnter = ():[string, string[], string[]] => {
  // 今のドレミ
  const [noteStr, setNoteStr] = useState<string>("");
  // 今のABC
  const [noteABCStr, setNoteABCStr] = useState<string>("");
  // 今までのドレミを保持する配列
  const [noteStrHist, setNoteStrHist] = useState<string[]>([]);
  // 今までのABCを保持する配列
  const [noteABCStrHist, setNoteABCStrHist] = useState<string[]>([]);

  var tmpNoteStr = ""
  var tmpNoteABCStr = ""
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

  const wait = (sec:any) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, sec*1000);
      //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
    });
  };

  useEffect(() => {
    async function setFromNone(event: { keyCode: number | Number }) {
      const keyCode = event.keyCode;
      if (keyCode === enter) {
        var pointer = 0
        while (pointer+1 < tmpNoteStr.length) {
            var oneNote = tmpNoteStr.substr(pointer, 2)
            if (oneNote === "sh" || oneNote[0] === "#") {
                oneNote += tmpNoteStr[pointer+2]
                pointer += 3
            } else {
                pointer += 2
            }
            console.log(oneNote)
            if (noteTypeArray.includes(oneNote)) {
                tmpNoteABCStr += toABC(oneNote)
                // setNoteABCStr(tmpNoteABCStr)
            }
        }
        // ドレミとABCを配列に入れる
        setNoteStrHist(prev => [...prev, tmpNoteStr])
        setNoteABCStrHist(prev => [...prev, tmpNoteABCStr])

        // 音鳴らすための処理
        pointer = 0
        while (pointer+1 < tmpNoteStr.length) {
            if (tmpNoteStr[pointer] === " ") { // todo:これ多分無理
                sleep(duration/1000)
            } else {
                oneNote = tmpNoteStr.substr(pointer, 2)
                if (oneNote === "sh" || oneNote[0] === "#") {
                    oneNote += tmpNoteStr[pointer+2]
                    pointer += 3
                } else {
                    pointer += 2
                }
                if (noteTypeArray.includes(oneNote)) {
                    playNote(oneNote)
                    await wait(1) // todo:今は1秒やけど音の長さにする
                }
            }
        }
        tmpNoteStr = ""
        setNoteStr(tmpNoteStr)
        tmpNoteABCStr = ""
        setNoteABCStr(tmpNoteABCStr)
      } else if (keyCode === d) {
        tmpNoteStr += "d"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === r) {
        tmpNoteStr += "r"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === m) {
        tmpNoteStr += "m"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === f) {
        tmpNoteStr += "f"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === s) {
        tmpNoteStr += "s"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === h) {
        tmpNoteStr += "h"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === o) {
        tmpNoteStr += "o"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === o) {
        tmpNoteStr += "o"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === e) {
        tmpNoteStr += "e"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === i) {
        tmpNoteStr += "i"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === i) {
        tmpNoteStr += "i"
        setNoteStr(tmpNoteStr)
      } else if (keyCode === a) {
        tmpNoteStr += "a"
        setNoteStr(tmpNoteStr)
      } else {
        // setReceivedKey("none");
      }
    }

    document.addEventListener("keydown", setFromNone);
    return () => {
      document.removeEventListener("keydown", setFromNone);
    };
  }, [noteStrHist, noteABCStrHist]);

  return [noteStr, noteStrHist, noteABCStrHist];
};

export default useConsoleKeyEnter;
