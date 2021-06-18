import React, { useEffect, useState } from "react";
import useReceiveKeyEnter from "./useReceiveKeyEnter";
import { useWindowDimensions } from "./useWindowDimentions";
import abcjs from "abcjs";

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

const WhiteKey: React.FC<{ nowplay: boolean }> = ({ nowplay }) => {
  return <div style={nowplay ? keyStylesOn : keyStyles}></div>;
};

const BlackKey: React.FC = () => {
  return <div style={blackKeyStyles}></div>;
};

const PianoMode: React.FC = () => {
  const [noteList, setNoteList] = useState<string>("");

  const windowDimensions = useWindowDimensions();
  const keyNum = windowDimensions.width / 64;
  const tone = useReceiveKeyEnter();

  const list = [];

  for (let index = 0; index < keyNum; index++) {
    switch (index % 7) {
      case 0:
        list.push(<WhiteKey key={index} nowplay={tone === "do"} />);
        list.push(<BlackKey key={index + 0.5} />);
        break;
      case 1:
        list.push(<WhiteKey key={index} nowplay={tone === "re"} />);
        list.push(<BlackKey key={index + 0.5} />);
        break;
      case 2:
        list.push(<WhiteKey key={index} nowplay={tone === "mi"} />);
        break;
      case 3:
        list.push(<WhiteKey key={index} nowplay={tone === "fa"} />);
        list.push(<BlackKey key={index + 0.5} />);
        break;
      case 4:
        list.push(<WhiteKey key={index} nowplay={tone === "so"} />);
        list.push(<BlackKey key={index + 0.5} />);
        break;
      case 5:
        list.push(<WhiteKey key={index} nowplay={tone === "ra"} />);
        list.push(<BlackKey key={index + 0.5} />);
        break;
      case 6:
        list.push(<WhiteKey key={index} nowplay={tone === "shi"} />);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    var addTone = "";
    if (tone === "do") {
      addTone = "C";
    } else if (tone === "re") {
      addTone = "D";
    } else if (tone === "mi") {
      addTone = "E";
    } else if (tone === "fa") {
      addTone = "F";
    } else if (tone === "so") {
      addTone = "G";
    } else if (tone === "ra") {
      addTone = "A";
    } else if (tone === "shi") {
      addTone = "B";
    }
    setNoteList((prevNoteList) => prevNoteList + addTone);
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
