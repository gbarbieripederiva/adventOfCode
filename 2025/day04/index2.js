// Find problem at: https://adventofcode.com/2025/day/4

// Format of inputs is a newline separated list of a r"(.|@)+"
// Solution tested with node v22.9.0

const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
// const fileInfo = fs .readFileSync(path.join(__dirname, "input_test.txt")) .toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo.split("\n").map((v) => v.split(""));
let res = 0;

let oneRemoved = true;
while (oneRemoved) {
  oneRemoved = false;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] == "@") {
        let neighbours = 0;
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            let inRange =
              (k != 0 || l != 0) &&
              i + k >= 0 &&
              i + k < lines.length &&
              j + l >= 0 &&
              j + l < lines[i + k].length;
            if (inRange && lines[i + k][j + l] == "@") neighbours++;
          }
        }

        if (neighbours < 4) {
          res++;
          lines[i][j] = ".";
          oneRemoved = true;
        }
      }
    }
  }
}

console.log("result: ", res);
