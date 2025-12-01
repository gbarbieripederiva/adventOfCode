// Find problem at: https://adventofcode.com/2025/day/1

// Format of inputs is a newline separated list of a r"(L|R)\d\d"
// Solution tested with node v22.9.0

const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo.split("\n");

let currentPos = 50,
  count = 0;
for (const line of lines) {
  const dir = line.substring(0, 1);
  const num = parseInt(line.substring(1));
  // console.log(
  //   "line: { dir: ",
  //   dir,
  //   ", num: ",
  //   num,
  //   ", currentPos: ",
  //   currentPos,
  //   ", count: ",
  //   count,
  //   " }",
  // );

  if (dir == "L") {
    currentPos -= num;
  } else if (dir == "R") {
    currentPos += num;
  } else {
    break;
  }

  // Needed to account for negative numbers
  currentPos = ((currentPos % 100) + 100) % 100;

  if (currentPos == 0) {
    count++;
  }
}

console.log("count was: ", count);
