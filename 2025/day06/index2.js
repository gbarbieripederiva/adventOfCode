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

const lines = fileInfo.split("\n").map((v) => v.split(""));
let res = 0;
const newLines = [];
for (let i = 0; i < lines[0].length; i++) {
  newLines.push([]);
  for (let j = 0; j < lines.length - 1; j++) {
    newLines[i].push(lines[j][i]);
  }
  newLines[i] = newLines[i].join("").trim();
}
let numbers = [[]],
  operators = [];
let i = 0;
for (const line of newLines) {
  if (line.length == 0) {
    i++;
    numbers.push([]);
  } else {
    let number = line;
    if (line[line.length - 1] == "*" || line[line.length - 1] == "+") {
      operators.push(line[line.length - 1]);
      number = line.substring(0, line.length - 1);
    }
    numbers[i].push(parseInt(number));
  }
}

for (let i = 0; i < operators.length; i++) {
  if (operators[i] == "*") {
    res += numbers[i].reduce((v, a) => v * a, 1);
  } else {
    res += numbers[i].reduce((v, a) => v + a, 0);
  }
}

console.log("result: ", res);
