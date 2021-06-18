import { useState, useEffect } from "react";

type nowGotted = "d" | "r" | "m" | "f" | "s" | "sh" | "none";
type note = "do" | "re" | "mi" | "fa" | "so" | "ra" | "shi" | "none";

const useReceiveKeyEnter = (): note => {
  const [receivedKey, setReceivedKey] = useState<nowGotted>("none");
  const [note, setNote] = useState<note>("none");

  const d = 68;
  const o = 79;
  const r = 82;
  const e = 69;
  const m = 77;
  const i = 73;
  const f = 70;
  const a = 65;
  const s = 83;
  const h = 72;

  useEffect(() => {
    function setFromNone(event: { keyCode: number | Number }) {
      const keyCode = event.keyCode;
      setNote("none");
      if (keyCode === d) {
        setReceivedKey("d");
      } else if (keyCode === r) {
        setReceivedKey("r");
      } else if (keyCode === m) {
        setReceivedKey("m");
      } else if (keyCode === f) {
        setReceivedKey("f");
      } else if (keyCode === s) {
        setReceivedKey("s");
      } else if (keyCode === h && receivedKey === "s") {
        setReceivedKey("sh");
      } else if (keyCode === o && receivedKey === "d") {
        setNote("do");
        setReceivedKey("none");
      } else if (keyCode === o && receivedKey === "s") {
        setNote("so");
        setReceivedKey("none");
      } else if (keyCode === e && receivedKey === "r") {
        setNote("re");
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "m") {
        setNote("mi");
        setReceivedKey("none");
      } else if (keyCode === i && receivedKey === "sh") {
        setNote("shi");
        setReceivedKey("none");
      } else if (keyCode === a && receivedKey === "f") {
        setNote("fa");
        setReceivedKey("none");
      } else if (keyCode === a && receivedKey === "r") {
        setNote("ra");
        setReceivedKey("none");
      } else {
        setReceivedKey("none");
      }
    }

    document.addEventListener("keydown", setFromNone);
    return () => {
      document.removeEventListener("keydown", setFromNone);
    };
  }, [receivedKey]);

  return note;
};

export default useReceiveKeyEnter;
