import Modal from "react-modal";
import "./button.css";

export const ExplainModal: React.FC<{ isOpen: boolean; toClose: () => void }> =
  ({ isOpen, toClose }) => {
    return (
      <Modal isOpen={isOpen} onRequestClose={toClose}>
        <div style={{ position: "relative", height: "100%" }}>
          <h2>これは何？</h2>
          <p style={{ paddingLeft: 10 }}>
            ピアノが弾けない人でも、音楽を奏でられるアプリです
          </p>
          <h2>どんなことができるの？</h2>
          <h3>モード</h3>
          <p style={{ paddingLeft: 10 }}>
            コンソールモード …
            見慣れたコンソール画面で音楽を奏でることができるモード:
          </p>
          <p style={{ paddingLeft: 10 }}>
            リアルタイムモード … リアルタイムで音楽を奏でることができるモード
          </p>
          <h3>音を鳴らす方法</h3>
          <p style={{ paddingLeft: 10 }}>(*はコンソールモードのみ)</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row" as "row",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <h4>基本</h4>
              <p>ド → do</p>
              <p>レ → re </p>
              <p>ミ → mi </p>
              <p>ファ → fa </p>
              <p>ソ → so </p>
              <p>ラ → ra </p>
              <p>シ → shi</p>
            </div>
            <div>
              <h4>♯(シとミ以外)</h4>
              <p>#ド → #do </p>
            </div>
            <div>
              <h4>オクターブを変える</h4>
              <p>オクターブ1つ低いド → ,do</p>
              <p>オクターブ2つ低いド → ,,do </p>
              <p>オクターブ1つ高いド → .do</p>
              <p>オクターブ2つ高いド → ..do</p>
            </div>
            <div>
              <h4>長さ調節*</h4>
              <p>長さ2倍→ +do </p>
              <p>長さ3倍 → ++do </p>
              <p>長さ1/2倍 → -do </p>
              <p>長さ1/3倍 → --do </p>
            </div>
            <div>
              <h4>休符*</h4>
              <p>空白(スペース)</p>
            </div>
            <div>
              <h4>入力の文字を間違えたときは*</h4>
              <p> deleteやbackspaceで削除ができるよ</p>
              <p> 例</p>
              <p> dofre → dore</p> <p> dorwmi → domi </p>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              className="btn dark"
              style={{ textAlign: "center" }}
              onClick={toClose}
            >
              ×閉じる
            </button>
          </div>
        </div>
      </Modal>
    );
  };

export default ExplainModal;
