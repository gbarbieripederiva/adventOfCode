// Find problem at: https://adventofcode.com/2024/day/3
// This script should be run witho node v22.9.0
//
// An `input.txt` file is required in the same folder the solution is in
//
// The format is a simple text file
const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
const operations = fileInfo.match(
  /(mul\([0-9][0-9]?[0-9]?,[0-9][0-9]?[0-9]?\))|(do\(\))|(don't\(\))/g
);
console.log(operations)

let sum = 0;
let enabled = true;
for(let op of operations) {
  if(/mul\([0-9][0-9]?[0-9]?,[0-9][0-9]?[0-9]?\)/.test(op)) {
    if(enabled) {
      sum +=    op
      .match(/[0-9]+/g)
      .map((v) => parseInt(v))
      .reduce((prev, curr) => prev * curr, 1);
    }
  } else if(/do\(\)/.test(op)) {
    enabled = true;
  } else {
    enabled = false;
  }
}

console.log("Sum returns: ", sum);
