import React, { useEffect, useState } from "react";
import useReceiveKeyEnter from "./useReceiveKeyEnter";
import { useWindowDimensions } from "./useWindowDimentions";
import abcjs from "abcjs";
import toABC from "./until/toABC";

const keyStyles = {
  height: 300,
  width: 64,
  backgroundColor: "#F5FCFF",
  border: "1px solid black",
};

const keyStylesOn = {
  ...keyStyles,
  backgroundColor: "#adefde",
};

const blackKeyStyles = {
  height: 150,
  width: 32,
  backgroundColor: "black",
  border: "1px solid black",
  marginLeft: -16,
  marginRight: -16,
  zIndex: 1,
};

const blackKeyStylesOn = {
  ...blackKeyStyles,
  backgroundColor: "#aaabcb",
}

const WhiteKey: React.FC<{ nowplay: boolean }> = ({ nowplay }) => {
  return <div style={nowplay ? keyStylesOn : keyStyles}></div>;
};

const BlackKey: React.FC<{ nowplay: boolean }> = ({ nowplay }) => {
  return <div style={nowplay ? blackKeyStylesOn : blackKeyStyles}></div>;
};

const PianoMode: React.FC = () => {
  const [noteList, setNoteList] = useState<string>("");

  const windowDimensions = useWindowDimensions();
  const keyNum = windowDimensions.width / 64;
  const tone = useReceiveKeyEnter();

  const list = [];

  // どこから有効キーにするか
  const playStartIndex = Math.floor(keyNum / 7 / 2) * 7;
  // どこまで有効キーにするか
  const playEndIndex = playStartIndex + 7;

  //鍵盤作成
  for (let index = 0; index < keyNum; index++) {
    const playable = index >= playStartIndex && index < playEndIndex;
    switch (index % 7) {
      case 0:
        list.push(
          <WhiteKey key={index} nowplay={playable ? tone === "do" : false} />
        );
        list.push(<BlackKey key={index + 0.5}　　nowplay={playable ? tone === "#do" : false} />);
        break;
      case 1:
        list.push(
          <WhiteKey key={index} nowplay={playable ? tone === "re" : false} />
        );
        list.push(<BlackKey key={index + 0.5} nowplay={playable ? tone === "#re" : false}　/>);
        break;
      case 2:
        list.push(
          <WhiteKey key={index} nowplay={playable ? tone === "mi" : false} />
        );
        break;
      case 3:
        list.push(
          <WhiteKey key={index} nowplay={playable ? tone === "fa" : false} />
        );
        list.push(<BlackKey key={index + 0.5} nowplay={playable ? tone === "#fa" : false} />);
        break;
      case 4:
        list.push(
          <WhiteKey key={index} nowplay={playable ? tone === "so" : false} />
        );
        list.push(<BlackKey key={index + 0.5} nowplay={playable ? tone === "#so" : false} />);
        break;
      case 5:
        list.push(
          <WhiteKey key={index} nowplay={playable ? tone === "ra" : false} />
        );
        list.push(<BlackKey key={index + 0.5} nowplay={playable ? tone === "#ra" : false} />);
        break;
      case 6:
        list.push(
          <WhiteKey key={index} nowplay={playable ? tone === "shi" : false} />
        );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    var addTone = toABC(tone);
    
    setNoteList((prevNoteList) => prevNoteList + addTone);
    console.log(noteList)
  }, [tone]);
  abcjs.renderAbc("abc", noteList);

  return (
    <div>
      <div id="abc"></div>
      <div style={{ display: "flex" }}>{list}</div>
    </div>
  );
};

export default PianoMode;
