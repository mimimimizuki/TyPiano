import React, { useState, useEffect } from "react";
import playNote from "./util/playNote";
import toABC from "./util/toABC";
import sleep from "./util/sleep";
import * as keyCodeList from "./common/keyCode";

const bpm = 120;
const duration = 60000 / bpm / 2;

const useConsoleKeyEnter = (): [string, string[], string[]] => {
  // 今のドレミ
  const [noteStr, setNoteStr] = useState<string>("");
  // 今のABC
  const [noteABCStr, setNoteABCStr] = useState<string>("");
  // 今までのドレミを保持する配列
  const [noteStrHist, setNoteStrHist] = useState<string[]>([]);
  // 今までのABCを保持する配列
  const [noteABCStrHist, setNoteABCStrHist] = useState<string[]>([]);

  var tmpNoteStr = "";
  var tmpNoteABCStr = "";
  var noteTypeArray = ["do", "re", "mi", "fa", "so", "ra", "shi"];

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

  const wait = (sec: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, sec * 1000);
      //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
    });
  };

  useEffect(() => {
    async function setFromNone(event: { keyCode: number | Number }) {
      const keyCode = event.keyCode;
      if (keyCode === enter) {
        var pointer = 0;
        while (pointer + 1 < tmpNoteStr.length) {
          var oneNote = tmpNoteStr.substr(pointer, 2);
          if (oneNote === "sh" || oneNote[0] === "#") {
            oneNote += tmpNoteStr[pointer + 2];
            pointer += 3;
          } else {
            pointer += 2;
          }
          console.log(oneNote);
          if (noteTypeArray.includes(oneNote)) {
            tmpNoteABCStr += toABC(oneNote);
            // setNoteABCStr(tmpNoteABCStr)
          }
        }
        // ドレミとABCを配列に入れる
        setNoteStrHist((prev) => [...prev, tmpNoteStr]);
        setNoteABCStrHist((prev) => [...prev, tmpNoteABCStr]);

        setNoteStr("");
        setNoteABCStr("");

        // 音鳴らすための処理
        pointer = 0;
        while (pointer + 1 < tmpNoteStr.length) {
          if (tmpNoteStr[pointer] === " ") {
            // todo:これ多分無理
            sleep(duration / 1000);
          } else {
            oneNote = tmpNoteStr.substr(pointer, 2);
            if (oneNote === "sh" || oneNote[0] === "#") {
              oneNote += tmpNoteStr[pointer + 2];
              pointer += 3;
            } else {
              pointer += 2;
            }
            if (noteTypeArray.includes(oneNote)) {
              playNote(oneNote);
              await wait(1); // todo:今は1秒やけど音の長さにする
            }
          }
        }
        tmpNoteStr = "";
        tmpNoteABCStr = "";
      } else if (keyCode === keyCodeList.d_Code) {
        tmpNoteStr += "d";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.r_Code) {
        tmpNoteStr += "r";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.m_Code) {
        tmpNoteStr += "m";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.f_Code) {
        tmpNoteStr += "f";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.s_Code) {
        tmpNoteStr += "s";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.h_Code) {
        tmpNoteStr += "h";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.o_Code) {
        tmpNoteStr += "o";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.e_Code) {
        tmpNoteStr += "e";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.i_Code) {
        tmpNoteStr += "i";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.a_Code) {
        tmpNoteStr += "a";
        setNoteStr(tmpNoteStr);
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
