// Find problem at: https://adventofcode.com/2025/day/1

// Format of inputs is a newline separated list of a r"(\d+-\d+,?)+"
// Solution tested with node v22.9.0

const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo.split(",").map((v) => v.split("-").map((v2) => parseInt(v2)));
let res = 0;

// Terribly inneficient solution. Something better must exist
function validateNum(val) {
  const str = val.toString()
  const len = str.length;
  for (let i = 2; i <= len; i++) {
    if (len % i != 0) continue;
    const seqLen = len / i;
    let valid = false;
    for (let j = 0; j <= i - 2; j++) {
      if (str.substring(seqLen * j, seqLen * (j + 1)) != str.substring(seqLen * (j + 1), seqLen * (j + 2))) {
        valid = true;
        break;
      }
    }
    if(!valid) { 
      return false;
    } 
  }
  return true;
}

for (const line of lines) {
  for (let i = line[0]; i <= line[1]; i++) {
    if (!validateNum(i)) {
      res += i;
    }
  }
}


console.log("result: ", res);
