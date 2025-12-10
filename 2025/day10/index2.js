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
    .map((_) => [...Array(machine.buttons.length + 1).fill(0)]);
  machine.buttons.forEach((b, i) => {
    for (const v of b) {
      mat[v][i] = 1;
    }
  });
  machine.joltage.forEach((v, i) => (mat[i][mat[i].length - 1] = v));

  let h = 0;
  let k = 0;

  const m = mat.length;
  const n = mat[0].length;

  function swapRow(mat, r1, r2) {
    let saveRow = Array(n)
      .fill(0)
      .map((_, i) => mat[r1][i]);
    for (let i = 0; i < n; i++) {
      mat[r1][i] = mat[r2][i];
      mat[r2][i] = saveRow[i];
    }
    return mat;
  }

  function argmax(start, stop, func) {
    let maxValue = func(start),
      maxI = start;
    for (let i = start + 1; i < stop; i++) {
      let fi = func(i);
      if (fi > maxValue) {
        maxValue = fi;
        maxI = i;
      }
    }
    return maxI;
  }

  while (h < m && k < n) {
    let iMax = argmax(h, m, (i) => Math.abs(mat[i][k]));
    if (mat[iMax][k] == 0) {
      k = k + 1;
    } else {
      mat = swapRow(mat, h, iMax);
      for (let i = h + 1; i < m; i++) {
        f = mat[i][k] / mat[h][k];
        mat[i][k] = 0;
        for (let j = k + 1; j < n; j++) {
          mat[i][j] = mat[i][j] - mat[h][j] * f;
        }
      }
      h = h + 1;
      k = k + 1;
    }
  }

  // TODO: incomplete. Missing solution
}

console.log("result: ", res);
