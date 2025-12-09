// Find problem at: https://adventofcode.com/2025/day/9

// Format of inputs is a newline separated list of a r"(\d+,\d+,\d+)"
// Solution tested with node v22.9.0

const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const filepath = argv.length > 2 ? argv[2] : null;
const fileInfo = fs
  .readFileSync(filepath != null ? filepath : path.join(__dirname, "input.txt"))
  .toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo
  .split("\n")
  .map((v) => v.split(",").map((v2) => parseInt(v2)));
lines.splice(lines.length - 1, 1);
let res = 0;

function calculateArea(x1, x2) {
  return (Math.abs(x1[0] - x2[0]) + 1) * (Math.abs(x1[1] - x2[1]) + 1);
}

let biggestSquare = 0;
for (let i = 0; i < lines.length; i++) {
  for (let j = i + 1; j < lines.length; j++) {
    let area = calculateArea(lines[i], lines[j]);
    if (area > biggestSquare) {
      biggestSquare = area;
    }
  }
}

res = biggestSquare;

console.log("result: ", res);
