import React from "react";
import "./button.css";

const headerPictureStyles = {
  position: "absolute" as "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(/typiano-top.png)`,
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
  fontFamily: "Source Code Pro, monospace",
  fontSize: 66,
  zIndex: 5,
  varticalAlign: "center",
  textAlign: "center" as "center",
};

const Top: React.FC<{ piano: () => void; console: () => void }> = ({
  piano,
  console,
}) => {
  return (
    <div style={headerPictureStyles}>
      <div style={headerStyles}>
        TyPiano
        <div className="iota">
          <button className="btn" onClick={() => console()}>
            <span>コンソールモード</span>
          </button>
          <button className="btn" onClick={() => piano()}>
            ピアノモード
          </button>
        </div>
      </div>
    </div>
  );
};

export default Top;
