import React from "react";
import useReceiveKeyEnter from "./useReceiveKeyEnter";
import { useWindowDimensions } from "./useWindowDimentions";

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
  const windowDimensions = useWindowDimensions();
  const keyNum = windowDimensions.width / 64;
  const tone = useReceiveKeyEnter();

  const list = [];

  for (let index = 0; index < keyNum; index++) {
    switch (index % 7) {
      case 0:
        list.push(<WhiteKey key={index} nowplay={tone === "do"} />);
        list.push(<BlackKey key={index + 0.5} nowplay={tone === "#do"} />);
        break;
      case 1:
        list.push(<WhiteKey key={index} nowplay={tone === "re"} />);
        list.push(<BlackKey key={index + 0.5} nowplay={tone === "#re"} />);
        break;
      case 2:
        list.push(<WhiteKey key={index} nowplay={tone === "mi"} />);
        break;
      case 3:
        list.push(<WhiteKey key={index} nowplay={tone === "fa"} />);
        list.push(<BlackKey key={index + 0.5} nowplay={tone === "#fa"} />);
        break;
      case 4:
        list.push(<WhiteKey key={index} nowplay={tone === "so"} />);
        list.push(<BlackKey key={index + 0.5} nowplay={tone === "#so"} />);
        break;
      case 5:
        list.push(<WhiteKey key={index} nowplay={tone === "ra"} />);
        list.push(<BlackKey key={index + 0.5} nowplay={tone === "#ra"} />);
        break;
      case 6:
        list.push(<WhiteKey key={index} nowplay={tone === "shi"} />);
        break;
      default:
        break;
    }
  }

  return <div style={{ display: "flex" }}>{list}</div>;
};

export default PianoMode;
