// Find problem at: https://adventofcode.com/2025/day/1

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

for (const line of lines) {
  if (line.length < 2) continue;

  let maxIndex1 = 0;
  for (let i = 1; i < line.length - 1; i++) {
    if (line[maxIndex1] < line[i]) {
      maxIndex1 = i;
    }
    if (line[maxIndex1] == 9) break;
  }

  let maxIndex2 = maxIndex1 + 1;
  for (let j = maxIndex1 + 2; j < line.length; j++) {
    if (line[maxIndex2] < line[j]) {
      maxIndex2 = j;
    }
    if (line[maxIndex2] == 9) break;
  }

  // console.log(
  //   line,
  //   " maxIndex1",
  //   maxIndex1,
  //   " ",
  //   line[maxIndex1],
  //   " maxIndex2",
  //   maxIndex2,
  //   " ",
  //   line[maxIndex2],
  //   " val:",
  //   line[maxIndex1].toString().concat(line[maxIndex2].toString())
  // );
  res += parseInt(
    line[maxIndex1].toString().concat(line[maxIndex2].toString())
  );
}

console.log("result: ", res);
