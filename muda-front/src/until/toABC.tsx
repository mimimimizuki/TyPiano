// 音をアルファベットに直す関数
function toABC(beforeNote: string) {
  var afterNote = "";
  if (beforeNote === "do") {
    afterNote += "C";
  } else if (beforeNote === "#do") {
    afterNote += "^C"
  } else if (beforeNote === "re") {
    afterNote += "D";
  } else if (beforeNote === "#re") {
    afterNote += "^D";
  } else if (beforeNote === "mi") {
    afterNote += "E";
  } else if (beforeNote === "fa") {
    afterNote += "F";
  } else if (beforeNote === "#fa") {
    afterNote += "^F";
  } else if (beforeNote === "so") {
    afterNote += "G";
  } else if (beforeNote === "#so") {
    afterNote += "^G";
  } else if (beforeNote === "ra") {
    afterNote += "A";
  } else if (beforeNote === "#ra") {
    afterNote += "^A";
  } else if (beforeNote === "shi") {
    afterNote += "B";
  }
    return afterNote
}

export default toABC;