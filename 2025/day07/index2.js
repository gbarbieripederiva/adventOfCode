// Find problem at: https://adventofcode.com/2025/day/7

// Format of inputs is a newline separated list of a r"((\.|S|^):)"
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

for (let i = 0; i < lines[0].length; i++) {
  if (lines[0][i] == "S") lines[1][i] = 1;
}

for (let i = 1; i < lines.length - 2; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] != "^" && lines[i][j] != ".") {
      let beam = lines[i][j];
      if (lines[i + 1][j] == "^") {
        if (j > 0)
          lines[i + 1][j - 1] =
            typeof lines[i + 1][j - 1] !== "string"
              ? lines[i + 1][j - 1] + beam
              : beam;
        if (j < lines.length - 1)
          lines[i + 1][j + 1] =
            typeof lines[i + 1][j + 1] !== "string"
              ? lines[i + 1][j + 1] + beam
              : beam;
      } else {
        lines[i + 1][j] =
          typeof lines[i + 1][j] != "string" ? lines[i + 1][j] + beam : beam;
      }
    }
  }
}

res = lines[lines.length - 2]
  .map((v) => (typeof v !== "string" ? v : 0))
  .reduce((v, a) => v + a, 0);

console.log("result: ", res);
