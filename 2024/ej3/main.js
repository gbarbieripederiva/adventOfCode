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
  /mul\([0-9][0-9]?[0-9]?,[0-9][0-9]?[0-9]?\)/g
);

const sum = operations
  .map((op) =>
    op
      .match(/[0-9]+/g)
      .map((v) => parseInt(v))
      .reduce((prev, curr) => prev * curr, 1)
  )
  .reduce((prev, curr) => prev + curr, 0);

console.log("Sum returns: ", sum);
