import React from "react";
import ReceiveKeyEnter from "./receiveKeyEnter";

const ConsoleMode: React.FC = () => {
  return (
    <div>
      <p>コンソール</p>
      <textarea className="console"></textarea>
    </div>
  );
};

export default ConsoleMode;
