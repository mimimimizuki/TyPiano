import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import img from "../public/howTo.png"

const headerStyles = {
  width: "100%",
  backgroundColor: "#ADF7AE",
  color: "#243324",
  fontFamily: "Source Code Pro, monospace",
  fontSize: 22,
  padding: 10,
};

const Header: React.FC = () => {
  return <div style={headerStyles}>TyPiano
  <Popup trigger={<p style={{position: "absolute", right: "10px"}}> 使い方</p>} position="left center">
    <img src={"../public/howTo.png"} />
  </Popup>
  </div>;
};

export default Header;
