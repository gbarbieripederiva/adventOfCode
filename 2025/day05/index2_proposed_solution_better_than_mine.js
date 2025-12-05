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

freshRanges = freshRanges.sort((a,b) => a[0] - b[0])

let li = freshRanges[0][1]
res = freshRanges[0][1] - freshRanges[0][0] + 1
for (let i = 1; i < freshRanges.length; i++) {
  if(li < freshRanges[i][0]){
    res += freshRanges[i][1] - freshRanges[i][0] + 1
  } else if(li == freshRanges[i][0]) {
    res += freshRanges[i][1] - freshRanges[i][0]
  } else if(li <= freshRanges[i][1]) {
    res += freshRanges[i][1] - li;
  }
  li = Math.max(li, freshRanges[i][1])
}


console.log("result: ", res);
