// Find problem at: https://adventofcode.com/2025/day/5

// Format of inputs is a newline separated list of a r"(\d+-\d+)" followed by
// a empty line followed by a list of r"(\d+)"
// Solution tested with node v22.9.0

const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
// const fileInfo = fs.readFileSync(path.join(__dirname, "input_test.txt")).toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo.split("\n");
let res = 0;

let freshRanges = [];
let startOfAvailable = 0;
for (const line of lines) {
  startOfAvailable++;
  if (line.length == 0) break;

  freshRanges.push(line.split("-").map((v) => parseInt(v)));
}

for (const line of lines.slice(startOfAvailable)) {
  let id = parseInt(line);
  if (freshRanges.some((range) => range[0] <= id && range[1] >= id)) {
    res++;
  }
}

console.log("result: ", res);
