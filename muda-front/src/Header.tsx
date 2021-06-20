import React from "react";

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

const Header: React.FC = () => {
  return (
    <div style={headerStyles}>
      <img src="/icon.png" alt="" style={{ height: 35 }}></img>
      <span>TyPiano</span>
    </div>
  );
};

export default Header;
