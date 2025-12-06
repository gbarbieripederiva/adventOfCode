// Find problem at: https://adventofcode.com/2025/day/6

// Format of inputs is a newline separated list of a r"((\d+ )+\d)" followed by
// a last line of r"((\+|\*)+)"
// Solution tested with node v22.9.0

const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const filepath = argv.length > 2 ? argv[2] : null;
const fileInfo = fs
  .readFileSync(filepath != null ? filepath : path.join(__dirname, "input.txt"))
  .toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo.split("\n");
let res = 0;

let numberLists = [];
let operationList = [];
for (const line of lines) {
  let numberMatch = [...line.matchAll(/\d+/g)];
  if (numberMatch.length > 0) {
    numberLists.push(numberMatch.map((v) => parseInt(v[0])));
  } else {
    let operationMatch = [...line.matchAll(/\+|\*/g)];
    if (operationMatch.length > 0) {
      operationList = operationMatch.map((v) => v[0]);
      break;
    }
  }
}

for (let i = 1; i < numberLists.length; i++) {
  for (let j = 0; j < operationList.length; j++) {
    if (operationList[j] == "+") {
      numberLists[0][j] += numberLists[i][j];
    } else if (operationList[j] == "*") {
      numberLists[0][j] *= numberLists[i][j];
    }
  }
}

res = numberLists[0].reduce((curr, acc) => curr + acc, 0);

console.log("result: ", res);
