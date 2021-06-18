import React ,{ useState } from "react";
import { emitKeypressEvents } from "readline";
import { Z_FIXED } from "zlib";
import ReceiveKeyEnter from "./receiveKeyEnter";

const consoleColor = {
  backgroundColor: "#041344",
  color:"#FFFFFF",
  height: "60vh",
  paddingRight: 20,
  paddingLeft: 20,
  paddingTop: 5,
  paddingBottom: 5,
};



const ConsoleMode: React.FC = () => {

  // 今まで入力したコマンドのリスト
  const command=["do","re","mi"];
  // 画面に表示するもの
  const list = [];

  for(let i=0; i<command.length; i++){
     list.push(<p>$ {command[i]}</p>)    
  }

  return (
    <div>
      <ReceiveKeyEnter></ReceiveKeyEnter>
      <div style={consoleColor}>
        {list}
      </div>
    </div>
  );
};

export default ConsoleMode;
