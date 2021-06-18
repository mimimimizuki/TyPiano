import React, { useState, useEffect } from "react";

var audio:any; 
function play(node:any,sec:any){
    stop();
    if(node>=96)return;

    const Hz=11025;//サンプリングレート

    //Waveデータ
    var bytes=new Uint8Array(Math.floor(Hz*sec)+100);
    //Waveヘッダー作成
    var header="524946460000000057415645666D74201000000001000100112B0000112B0000010008006461746100000000";
    var fp = 0
    while (fp < header.length/2){
      bytes[fp]=parseInt(header.substr(fp*2,2),16);
      fp += 1;
    }

    //音階(ドド#レ…シ)の周波数(1オクターブ下がると1/2倍)
    var freqs=[4180, 4428, 4708, 4968, 5264, 5592, 5884, 6300, 6676, 6988, 7476, 7848];

    //1サンプルあたりの位相計算
    const octave = Math.floor(node/12); //オクターブ
    const freq = freqs[node%12] / (1<<(7-octave)); //周波数
    const phase = 6.28 / (Hz / freq);

    //波形作成
    for (let t = 0; t < Math.floor(Hz*sec); t++){
        bytes[fp++] = Math.floor(Math.sin(phase*t)*127)+128;
    }

    //データ補正
    setLittleEndian(bytes,4,fp-8);  //ファイルサイズ
    setLittleEndian(bytes,24,Hz);   //サンプリングレート
    setLittleEndian(bytes,40,fp-44);//波形サイズ

    //BASE64変換してオーディオ作成
    var str="";
    for (let i=0;i<fp;i++){str+=String.fromCharCode(bytes[i]);}
    audio=new Audio("data:audio/wav;base64,"+btoa(str));
    audio.play();
}
      
function stop(){
    if (audio&&!audio.ended){
      audio.pause();audio.currentTime=0;
    }
}
function setLittleEndian(bytes:any,p:any,data:any){
    bytes[p] = (data & 0xFF);
    bytes[p+1] = ((data >> 8) & 0xFF);
    bytes[p+2] = ((data >> 16) & 0xFF);
    bytes[p+3] = ((data >> 24) & 0xFF);
}

type nowGotted = "d" | "r" | "m" | "f" | "s" | "sh" | "none";
type note = "do" | "re" | "mi" | "fa" | "so" | "ra" | "shi" | "none";

const ReceiveKeyEnter: React.FC = () => {
  const [receivedKey, setReceivedKey] = useState<nowGotted>("none");
  const [note, setNote] = useState<note>("none");
  var noteStr = ""

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
