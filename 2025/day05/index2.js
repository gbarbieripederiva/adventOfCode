// Find problem at: https://adventofcode.com/2025/day/1

// Format of inputs is a newline separated list of a r"(\d+-\d+)" followed by
// a empty line followed by a list of r"(\d+)"
// Solution tested with node v22.9.0

const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const filepath = argv.length > 2 ? argv[2] : null;
const fileInfo = fs.readFileSync(filepath != null ? filepath : path.join(__dirname, "input.txt")).toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo.split("\n");
let res = 0;

let freshRanges = [];
for (const line of lines) {
  if (line.length == 0) break;

  freshRanges.push(line.split("-").map((v) => parseInt(v)));
}

function canBeMerged(r1, r2) {
  return (
    (r1[0] <= r2[0] && r2[0] <= r1[1]) || (r1[0] <= r2[1] && r2[1] <= r1[1]) ||
    (r2[0] <= r1[0] && r1[0] <= r2[1]) || (r2[0] <= r1[1] && r1[1] <= r2[1])
  );
}

function merge(r1, r2) {
  return [Math.min(r1[0], r2[0]), Math.max(r1[1], r2[1])];
}

let anyMerged = true;
while (anyMerged) {
  anyMerged = false;
  for (let i = 0; i < freshRanges.length - 1; i++) {
    for (let j = i + 1; j < freshRanges.length; j++) {
      if (canBeMerged(freshRanges[i], freshRanges[j])) {
        freshRanges[i] = merge(freshRanges[i], freshRanges[j]);
        freshRanges.splice(j, 1);
        anyMerged = true;
        break;
      }
    }
    if (anyMerged) break;
  }
}

for (const r of freshRanges) {
  res += r[1] - r[0] + 1;
}

console.log("result: ", res);
