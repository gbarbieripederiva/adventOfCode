// Find problem at: https://adventofcode.com/2025/day/3

// Format of inputs is a newline separated list of a r"\d\d\d+"
// Solution tested with node v22.9.0

const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo
  .split("\n")
  .map((v) => v.split("").map((v2) => parseInt(v2)));
let res = 0;

function getMaxIndex(line, start, end) {
  let maxIndex = start;
  for (let i = start + 1; i < end; i++) {
    if (line[maxIndex] < line[i]) {
      maxIndex = i;
    }
    if (line[maxIndex] == 9) break;
  }
  return maxIndex;
}

for (const line of lines) {
  if (line.length < 12) continue;

  let maxIndexes = new Array(13);
  maxIndexes[0] = -1;
  for (let i = 0; i < 12; i++) {
    maxIndexes[i + 1] = getMaxIndex(
      line,
      maxIndexes[i] + 1,
      line.length - (11 - i),
    );
  }
  maxIndexes.shift();

  // console.log(
  //   "indexes:",
  //   maxIndexes.map((v) => v.toString()).join(","),
  //   "values:",
  //   maxIndexes.map((v) => line[v].toString()).join("")
  // );
  res += parseInt(maxIndexes.map((v) => line[v].toString()).join(""));
}

console.log("result: ", res);
