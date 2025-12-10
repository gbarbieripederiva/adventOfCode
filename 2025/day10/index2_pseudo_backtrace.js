// Find problem at: https://adventofcode.com/2025/day/9

// Format of inputs is a newline separated list of a r"\[(\.|#)?\] (\((\d,)*\d\) )+ {(\d,)*\d}"
// Solution tested with node v22.9.0

const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const filepath = argv.length > 2 ? argv[2] : null;
const fileInfo = fs
  .readFileSync(filepath != null ? filepath : path.join(__dirname, "input.txt"))
  .toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo.split("\n").map((v) => v.split(" "));
let res = 0;

let machines = [];
let mid = 0;
for (const line of lines) {
  if (line.length < 3) continue;
  let machine = {
    id: mid++,
  };
  machine.state = line[0]
    .substring(1, line[0].length - 1)
    .split("")
    .map((v) => v == "#");
  machine.buttons = line.slice(1, line.length - 1).map((v) =>
    v
      .substring(1, v.length - 1)
      .split(",")
      .map((v) => parseInt(v))
  );
  machine.joltage = line[line.length - 1]
    .substring(1, line[line.length - 1].length - 1)
    .split(",")
    .map((v) => parseInt(v));
  machines.push(machine);
}

for (const machine of machines) {
  console.log("Doing machine:", machine.id);

  let mat = Array(machine.joltage.length)
    .fill(0)
    .map((_) => [...Array(machine.buttons.length).fill(0)]);
  machine.buttons.forEach((b, i) => {
    for (const v of b) {
      mat[v][i] = 1;
    }
  });

  let presses = [Array(machine.buttons.length).fill(null)];
  for (let i = 0; i < machine.joltage.length; i++) {
    let joltage = machine.joltage[i];
    let row = mat[i];
    presses = presses.map((p) => {
      let newPresses = [p];
      if (
        joltage -
          row.map((v, i) => v * (p[i] ?? 0)).reduce((a, b) => a + b, 0) <
        0
      ) {
        return [];
      }
      for (let i = 0; i < row.length; i++) {
        if (row[i] != 0 && p[i] == null) {
          newPresses = newPresses.map((np) => {
            let missingJoltage =
              joltage -
              row.map((v, i) => v * (np[i] ?? 0)).reduce((a, b) => a + b, 0);
            if (missingJoltage < 0) return [];
            if (row.slice(i + 1).some((v) => v > 0)) {
              return Array.from(
                { length: missingJoltage + 1 },
                (_, i) => i
              ).map((v) => [...np].with(i, v));
            } else {
              return [[...np].with(i, missingJoltage)];
            }
          });
          newPresses = newPresses.flat();
        }
      }
      return newPresses;
    });
    presses = presses.flat();
  }

  let minValid = null;
  for (const p of presses) {
    let pjoltage = Array(machine.joltage.length).fill(0);
    for (let i = 0; i < p.length; i++) {
      for (const b of machine.buttons[i]) {
        pjoltage[b] += p[i];
      }
    }
    if (pjoltage.every((v, i) => v == machine.joltage[i])) {
      const value = p.reduce((a, b) => a + b, 0);
      if (minValid == null || minValid > value) {
        minValid = value;
      }
    }
  }
  res += minValid;
}

console.log("result: ", res);
