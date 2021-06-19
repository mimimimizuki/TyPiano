import sleep from "./sleep";

// 音を鳴らす関数
const bpm = 120
const duration = (60000 / bpm) / 2 * 20

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

// どの音を鳴らすか
function　playNote(noteName: string, counter: number, sec: number){
    if (noteName === "do") {
        play(48+counter*12, sec);
    } else if (noteName == "#do") {
        play(49+counter*12, sec);
    } else if (noteName === "re") {
        play(50+counter*12, sec);
    } else if (noteName === "#re") {
        play(51+counter*12, sec);
    } else if (noteName === "mi") {
        play(52+counter*12, sec);
    } else if (noteName === "fa") {
        play(53+counter*12, sec);
    } else if (noteName === "#fa") {
        play(54+counter*12, sec);
    } else if (noteName === "so") {
        play(55+counter*12, sec);
    } else if (noteName === "#so") {
        play(56+counter*12, sec);
    } else if (noteName === "ra") {
        play(57+counter*12, sec);
    } else if (noteName === "#ra") {
        play(58+counter*12, sec);
    } else if (noteName === "shi") {
        play(59+counter*12, sec);
    }
}

export default playNote;