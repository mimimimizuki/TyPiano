import React from "react";

const headerStyles = {
  position: "absolute" as "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#ADF7AE",
  color: "#243324",
  fontFamily: "Source Code Pro, monospace",
  fontSize: 22,
  zIndex: 5,
  varticalAlign: "center",
  textAlign: "center" as "center",
};

const Top: React.FC<{ piano: () => void; console: () => void }> = ({
  piano,
  console,
}) => {
  return (
    <div style={headerStyles}>
      TyPiano
      <div>
        <button onClick={() => console()}>コンソールモード</button>
        <button onClick={() => piano()}>ピアノモード</button>
      </div>
    </div>
  );
};

export default Top;
