import React from "react";
import abcjs from "abcjs";
import useConsoleKeyEnter from "./consoleKeyEnter";

const consoleColor = {
  backgroundColor: "#041344",
  color: "#FFFFFF",
  height: "60vh",
  paddingRight: 20,
  paddingLeft: 20,
  paddingTop: 5,
  paddingBottom: 5,
  overflowY: "scroll" as "scroll",
};

const ConsoleBlock: React.FC<{ command: string; abc: string; i: number }> = ({
  command,
  abc,
  i,
}) => {
  const commandId = "command" + String(i);
  const scoreId = "score" + String(i);

  abcjs.renderAbc(scoreId, abc);

  return (
    <div>
      <p key={commandId}>$ {command}</p>
      <div id={scoreId} key={scoreId}></div>
    </div>
  );
};

const ConsoleMode: React.FC = () => {
  // [["doremi", "remifa"], ["CDE", "EFG"], "dor"のイメージ
  const [nowString, commandHist, ABCHist] = useConsoleKeyEnter();

  // 画面に表示するもの
  const list = [];

  // 今までの履歴をデザインに変えている
  for (let i = 0; i < ABCHist.length; i++) {
    // ConsoleBlockは、$doremiと五線譜のブロック
    // commandは$doremiに使う
    // abcは五線譜に使う
    // iはidとかなので気にしなくていい
    list.push(
      <ConsoleBlock
        command={commandHist[i]}
        abc={ABCHist[i]}
        i={i}
      ></ConsoleBlock>
    );
  }
  // 履歴と、一番下に今のやつを表示
  return (
    <div>
      <div style={consoleColor}>
        {list}
        <p>$ {nowString}</p>
      </div>
    </div>
  );
};

export default ConsoleMode;
