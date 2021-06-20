import { url } from "inspector";
import React from "react";
import iconImage from "../src/icon.png";

const headerStyles = {
  display: "flex",
  arignItems: "center",
  width: "100%",
  height: 40,
  backgroundColor: "#C6F7C7",
  color: "#243324",
  fontFamily: "Alex Brush, cursive",
  fontSize: 22,
  padding: 10,
};

const Header: React.FC<{ toTop: () => void; openModal: () => void }> = ({
  toTop,
  openModal,
}) => {
  return (
    <div style={headerStyles}>
      <img
        src={iconImage}
        alt=""
        style={{ height: 35, cursor: "pointer" }}
        onClick={toTop}
      ></img>
      <span style={{ cursor: "pointer" }} onClick={toTop}>
        TyPiano
      </span>

      <div
        style={{
          width: 30,
          height: 30,
          padding: 5,
          marginLeft: "auto",
          marginRight: 30,
          border: "1px solid black",
          borderRadius: "50%",
          textAlign: "center",
          cursor: "pointer",
          fontFamily: "Noto Sans JP, sans-serif",
        }}
        onClick={openModal}
      >
        ？
      </div>
    </div>
  );
};

export default Header;
