// Find problem at: https://adventofcode.com/2025/day/11

// Format of inputs is a newline separated list of a r".+:( .*)"
// Solution tested with node v22.9.0

const { debug } = require("console");
const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const filepath = argv.length > 2 ? argv[2] : null;
const fileInfo = fs
  .readFileSync(filepath != null ? filepath : path.join(__dirname, "input.txt"))
  .toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo
  .split("\n")
  .map((v) =>
    v.length > 0
      ? {
          device: v.split(":")[0],
          outputs: v
            .split(":")[1]
            .split(" ")
            .filter((v) => v.length > 0),
        }
      : null
  )
  .filter((v) => v != null);
let res = 0;

function findDevice(device) {
  for (const d of lines) {
    if (device == d.device) {
      return d;
    }
  }
}

let stack = [...findDevice("you").outputs];
let paths = stack.length;
while (stack.length > 0) {
  let next = stack.pop();
  let d = findDevice(next);
  if ((d?.outputs?.length ?? 0) > 0) {
    paths += d.outputs.length - 1;
    stack.push(...d.outputs);
  } else if (next != "out") {
    paths -= 1;
  }
}

res = paths;

console.log("result: ", res);
