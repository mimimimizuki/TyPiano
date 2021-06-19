// 音をアルファベットに直す関数
function toABC(beforeNote: string,counter:number, lengthCounter:number) {
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
  } else {
    if (beforeNote[1] == "/") {

    }
  }
  if (counter == 1){
    afterNote = afterNote.toLowerCase();
  } else if (counter > 1){
    afterNote = afterNote.toLowerCase();
    afterNote += "\'".repeat(counter);
  } else if (counter < 0){
    afterNote += ",".repeat(-counter);
  } 
  if (lengthCounter > 0) {
    afterNote += (2**lengthCounter).toString();
  } else if (lengthCounter < 0) {
    afterNote += "1/"+(2**(-1*lengthCounter)).toString();
  }
  console.log(afterNote)
  return afterNote
}

export default toABC;