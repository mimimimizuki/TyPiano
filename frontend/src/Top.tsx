import React from "react";
import "./button.css";
import "./Top.css";
import topImage from "../src/typiano-top.png";

const headerPictureStyles = {
  position: "absolute" as "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${topImage})`,
  backgroundSize: "cover",
};
const headerStyles = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "center",
  position: "absolute" as "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0, 0.2)",
  color: "#FFFFFF",
  fontFamily: "Alex Brush, cursive",
  fontSize: 66,
  varticalAlign: "center",
  textAlign: "center" as "center",
};

const Top: React.FC<{
  piano: () => void;
  console: () => void;
  openModal: () => void;
}> = ({ piano, console, openModal }) => {
  return (
    <div style={headerPictureStyles}>
      <div style={headerStyles}>
        <h1>TyPiano</h1>
        <div className="iota">
          <button className="btn" onClick={() => openModal()}>
            <span>使い方</span>
          </button>
          <div style={{ marginTop: 50 }}>
            <button className="btn" onClick={() => piano()}>
              <span>ピアノモード</span>
            </button>
            <button className="btn" onClick={() => console()}>
              コンソールモード
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
