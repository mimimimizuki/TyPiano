import React, { useEffect, useState } from "react";
import useReceiveKeyEnter from "./useReceiveKeyEnter";
import { useWindowDimensions } from "./useWindowDimentions";
import abcjs from "abcjs";
import toABC from "./util/toABC";
import "./slide.css";

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
  marginLeft: -17,
  marginRight: -17,
  zIndex: 1,
};

const blackKeyStylesOn = {
  ...blackKeyStyles,
  backgroundColor: "#aaabcb",
};

const blackKeyHalfStyles = {
  height: 150,
  width: 16,
  backgroundColor: "black",
  border: "1px solid black",
  marginLeft: -17,
  marginRight: 0,
  zIndex: 1,
};

const blackKeyHalfStylesOn = {
  ...blackKeyHalfStyles,
  backgroundColor: "#aaabcb",
};

const keyLong = {
  position: "fixed" as "fixed",
  bottom: 0,
  transformOrigin: "bottom",
  animationName: "to-long",
  animationDuration: "2s",
  animationFillMode: "forwards",
};

const keyShort = {
  position: "fixed" as "fixed",
  bottom: 0,
  transformOrigin: "bottom",
  animationName: "to-short",
  animationDuration: "2s",
  animationFillMode: "forwards",
};

const WhiteKey: React.FC<{ nowplay: boolean }> = ({ nowplay }) => {
  return <div style={nowplay ? keyStylesOn : keyStyles}></div>;
};

const BlackKey: React.FC<{ nowplay: boolean; last: boolean }> = ({
  nowplay,
  last,
}) => {
  const style = last ? blackKeyHalfStyles : blackKeyStyles;
  const styleOn = last ? blackKeyHalfStylesOn : blackKeyStylesOn;
  return <div style={nowplay ? styleOn : style}></div>;
};

const PianoMode: React.FC<{ doRemove: boolean }> = ({ doRemove }) => {
  const [noteList, setNoteList] = useState<string>("");

  const windowDimensions = useWindowDimensions();
  const keyNum = Math.floor(windowDimensions.width / 65);
  const [tone, counter] = useReceiveKeyEnter();

  const list = [];

  // どこから有効キーにするか
  var playStartIndex = Math.floor(keyNum / 7 / 2) * 7; 
  // どこまで有効キーにするか
  var playEndIndex = playStartIndex + 7;
  if (counter > 0){
    playStartIndex += 7;
    playEndIndex += 7;
  } else if (counter < 0) {
    playStartIndex -=  7;
    playEndIndex -= 7;
  } 

  //鍵盤作成
  for (let index = 0; index < keyNum; index++) {
    const playable = index >= playStartIndex && index < playEndIndex;
    switch (index % 7) {
      case 0:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "do" : false}
          />
        );
        list.push(
          <BlackKey
            key={index + 0.5}
            last={index === keyNum - 1}
            nowplay={playable && !doRemove ? tone === "#do" : false}
          />
        );
        break;
      case 1:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "re" : false}
          />
        );
        list.push(
          <BlackKey
            key={index + 0.5}
            last={index === keyNum - 1}
            nowplay={playable && !doRemove ? tone === "#re" : false}
          />
        );
        break;
      case 2:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "mi" : false}
          />
        );
        break;
      case 3:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "fa" : false}
          />
        );
        list.push(
          <BlackKey
            key={index + 0.5}
            last={index === keyNum - 1}
            nowplay={playable && !doRemove ? tone === "#fa" : false}
          />
        );
        break;
      case 4:
        list.push(
          <WhiteKey key={index} nowplay={playable ? tone === "so" : false} />
        );
        list.push(
          <BlackKey
            key={index + 0.5}
            last={index === keyNum - 1}
            nowplay={playable && !doRemove ? tone === "#so" : false}
          />
        );
        break;
      case 5:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "ra" : false}
          />
        );
        list.push(
          <BlackKey
            key={index + 0.5}
            last={index === keyNum - 1}
            nowplay={playable && !doRemove ? tone === "#ra" : false}
          />
        );
        break;
      case 6:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "shi" : false}
          />
        );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    var addTone = toABC(tone, counter, 0);
    setNoteList((prevNoteList) => prevNoteList + addTone);
  }, [tone]);
  abcjs.renderAbc("abc", noteList);

  return (
    <div style={doRemove ? keyShort : keyLong}>
      <div className="score-stand" style={{ position: "relative" }}>
        <div
          className="score-wrapper"
          style={{
            position: "absolute",
            top: -60,
            left: "10%",
            width: "80%",
            height: 200,
            padding: 10,
            border: "1px solid black",
            backgroundColor: "white",
          }}
        >
          <div
            id="abc"
            style={{
              margin: "30px 0",
            }}
          ></div>
        </div>
        <div
          style={{
            backgroundColor: "black",
            marginLeft: "5%",
            width: "90%",
            height: 120,
            zIndex: -1,
          }}
        ></div>
      </div>

      <div
        style={{ backgroundColor: "black", height: 100, width: "100%" }}
      ></div>
      <div style={{ display: "flex" }}>{list}</div>
    </div>
  );
};

export const PianoBase: React.FC<{ inPiano: boolean }> = ({ inPiano }) => {
  const windowDimensions = useWindowDimensions();
  const keyNum = Math.floor(windowDimensions.width / 65);

  const list = [];
  for (let index = 0; index < keyNum - 1; index++) {
    switch (index % 7) {
      case 0:
        list.push(<WhiteKey key={index} nowplay={false} />);
        list.push(
          <BlackKey
            last={index === keyNum - 1}
            key={index + 0.5}
            nowplay={false}
          />
        );
        break;
      case 1:
        list.push(<WhiteKey key={index} nowplay={false} />);
        list.push(
          <BlackKey
            last={index === keyNum - 1}
            key={index + 0.5}
            nowplay={false}
          />
        );
        break;
      case 2:
        list.push(<WhiteKey key={index} nowplay={false} />);
        break;
      case 3:
        list.push(<WhiteKey key={index} nowplay={false} />);
        list.push(
          <BlackKey
            last={index === keyNum - 1}
            key={index + 0.5}
            nowplay={false}
          />
        );
        break;
      case 4:
        list.push(<WhiteKey key={index} nowplay={false} />);
        list.push(
          <BlackKey
            last={index === keyNum - 1}
            key={index + 0.5}
            nowplay={false}
          />
        );
        break;
      case 5:
        list.push(<WhiteKey key={index} nowplay={false} />);
        list.push(
          <BlackKey
            last={index === keyNum - 1}
            key={index + 0.5}
            nowplay={false}
          />
        );
        break;
      case 6:
        list.push(<WhiteKey key={index} nowplay={false} />);
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          transform: "scaleY(0.2)",
          position: "fixed" as "fixed",
          bottom: -121,
          zIndex: -1,
        }}
      >
        {list}
      </div>
      {!inPiano && (
        <div
          style={{
            position: "fixed" as "fixed",
            bottom: 0,
            marginLeft: 20,
            marginBottom: 7,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 0 10px 10px white",
          }}
        >
          ピアノモードへ
        </div>
      )}
    </div>
  );
};

export default PianoMode;
