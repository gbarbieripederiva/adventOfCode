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

let safe = 0;
for(let line of fileInfo.split("\n")) {
  const parsedLine = line.split(" ").map((v) => parseInt(v));
  let isAscending = parsedLine[0] < parsedLine[1];
  let isValid = Math.abs(parsedLine[0] - parsedLine[1]) <= 3 && parsedLine[0] != parsedLine[1];
  for(let i = 2; i < parsedLine.length && isValid; i++) {
    isValid = Math.abs(parsedLine[i] - parsedLine[i-1]) <= 3 &&
              (
                (isAscending && parsedLine[i-1] < parsedLine[i]) ||
                (!isAscending && parsedLine[i-1] > parsedLine[i])
              );
  }
  if(isValid) {
    safe = safe + 1;
  }
}

console.log("Safe reports: ", safe)
