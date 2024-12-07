// Find problem at: https://adventofcode.com/2024/day/2
// This script should be run witho node v22.9.0
//
// An `input.txt` file is required in the same folder the solution is in
//
// The format is a newline separated list of space separated int unsigned
// values

const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();

function isReportValid(report) {
  let isAscending = report[0] < report[1];
  let isValid =
    Math.abs(report[0] - report[1]) <= 3 &&
    report[0] != report[1];
  for (let i = 2; i < report.length && isValid; i++) {
    isValid =
      Math.abs(report[i] - report[i - 1]) <= 3 &&
      ((isAscending && report[i - 1] < report[i]) ||
        (!isAscending && report[i - 1] > report[i]));
  }
  return isValid;
}

let safe = 0;
for (let line of fileInfo.split("\n")) {
  const parsedLine = line.split(" ").map((v) => parseInt(v));
  let isValid = isReportValid(parsedLine);
  if(!isValid) {
    for(let i = 0; i < parsedLine.length && !isValid; i++) {
      isValid = isReportValid([...parsedLine.slice(0, i), ...parsedLine.slice(i+1, parsedLine.length)]);
    }
  }
  if (isValid) {
    safe = safe + 1;
  }
}

console.log("Safe reports: ", safe);
