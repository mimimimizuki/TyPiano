// 音をアルファベットに直す関数
function toABC(beforeNote: string,counter:number) {
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
  } else if (beforeNote === " ") {
    afterNote += "z";
  }
  if (counter == 1){
    console.log("here")
    afterNote = afterNote.toLowerCase();
  }
  console.log(afterNote)
    return afterNote
}

export default toABC;