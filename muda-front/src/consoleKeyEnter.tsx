import React, { useState, useEffect } from "react";
import playNote from "./util/playNote";
import toABC from "./util/toABC";
import sleep from "./util/sleep";
import * as keyCodeList from "./common/keyCode";

const bpm = 64;
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
  var noteTypeArray = ["do", "re", "mi", "fa", "so", "ra", "shi", "#do", "#re", "#fa", "#so", "#ra", " "];

  const wait = (sec: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, sec * 1000);
      //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
    });
  };

  useEffect(() => {
    async function setFromNone(event: { keyCode: number | Number }) {
      const keyCode = event.keyCode;
      if (keyCode === keyCodeList.enter_code) {
        var pointer = 0;
        var octaveCounter = 0;
        var lengthCounter = 0;
        while (pointer + 1 < tmpNoteStr.length) {
          if (tmpNoteStr[pointer] === ",") {
            octaveCounter -= 1;
            pointer += 1;
            continue;
          } else if (tmpNoteStr[pointer] === ".") {
            octaveCounter += 1;
            pointer += 1;
            continue;
          } else if (tmpNoteStr[pointer] === "+") {
            pointer += 1;
            lengthCounter += 1;
            continue;
          } else if (tmpNoteStr[pointer] === "-") {
            pointer += 1;
            lengthCounter -= 1;
            continue;
          }
          var oneNote = tmpNoteStr.substr(pointer, 2);
          if (oneNote === "sh" || oneNote[0] === "#") {
            oneNote += tmpNoteStr[pointer + 2];
            pointer += 3;
          } else if (oneNote[0] === " ") {
            pointer += 1;
            oneNote = " "
          } else {
            pointer += 2;
          }
          if (noteTypeArray.includes(oneNote)) {
            tmpNoteABCStr += toABC(oneNote, octaveCounter, lengthCounter);
            octaveCounter = 0;
            lengthCounter = 0;
            // setNoteABCStr(tmpNoteABCStr)
          } else {
            pointer -= 1
          }
        }
        // ドレミとABCを配列に入れる
        setNoteStrHist((prev) => [...prev, tmpNoteStr]);
        setNoteABCStrHist((prev) => [...prev, tmpNoteABCStr]);

        setNoteStr("");
        setNoteABCStr("");

        // 音鳴らすための処理
        pointer = 0;
        octaveCounter = 0;
        while (pointer + 1 < tmpNoteStr.length) {
        　if (tmpNoteStr[pointer] === ",") {
            octaveCounter -= 1;
            pointer += 1;
            continue;
        　} else if (tmpNoteStr[pointer] === ".") {
            octaveCounter += 1;
            pointer += 1;
            continue;
        　} else if (tmpNoteStr[pointer] === "+") {
            pointer += 1;
            lengthCounter += 1;
            continue;
          } else if (tmpNoteStr[pointer] === "-") {
            pointer += 1;
            lengthCounter -= 1;
            continue;
          }
          oneNote = tmpNoteStr.substr(pointer, 2);
          if (oneNote === "sh" || oneNote[0] === "#") {
              oneNote += tmpNoteStr[pointer + 2];
              pointer += 3;
          } else if (oneNote[0] === " ") {
              pointer += 1;
              oneNote = " "
            } else {
              pointer += 2;
          }
          if (noteTypeArray.includes(oneNote)) {
              if (oneNote === " ") {
                  await wait(60/bpm/2);
              } else {
                  var beep_time = 60/(bpm*4);
                  if (lengthCounter > 0) {
                    beep_time = beep_time * (2*lengthCounter);
                  } else if (lengthCounter < 0) {
                    beep_time = beep_time / (-2*lengthCounter);
                  }
                  playNote(oneNote,octaveCounter,beep_time)
                  octaveCounter = 0;
                  lengthCounter = 0
                  await wait(beep_time);
              }
          } else { // ミスタイプのとき
              pointer -= 1
          }
        }
        tmpNoteStr = "";
        tmpNoteABCStr = "";
      } else if (keyCode === keyCodeList.d_code) {
        tmpNoteStr += "d";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.r_code) {
        tmpNoteStr += "r";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.m_code) {
        tmpNoteStr += "m";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.f_code) {
        tmpNoteStr += "f";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.s_code) {
        tmpNoteStr += "s";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.h_code) {
        tmpNoteStr += "h";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.o_code) {
        tmpNoteStr += "o";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.e_code) {
        tmpNoteStr += "e";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.i_code) {
        tmpNoteStr += "i";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.a_code) {
        tmpNoteStr += "a";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.sharp_code) {
        tmpNoteStr += "#";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.upOctave_code) {
        tmpNoteStr += ".";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.downOctave_code) {
        tmpNoteStr += ",";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === keyCodeList.space_code) {
        tmpNoteStr += " ";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === 187) {
        tmpNoteStr += "+";
        setNoteStr(tmpNoteStr);
      } else if (keyCode === 189) {
        tmpNoteStr += "-";
        setNoteStr(tmpNoteStr);
      }　else {
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
