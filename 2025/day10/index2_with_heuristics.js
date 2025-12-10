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

function applyButton(state, button) {
  let newState = [...state];
  for (const b of button) {
    newState[b] += 1;
  }
  return newState;
}

for (const m of machines) {
  console.log("Doing machine:", m.id);

  closeness = (state) =>
    state.map((v, i) => m.joltage[i] - v).reduce((p, a) => p + a, 0);
  valid = (state) => state.every((v, i) => v <= m.joltage[i]);
  let ops = [
    {
      state: m.joltage.map((v) => 0),
      presses: 0,
      closeness: closeness(m.joltage.map((v) => 0)),
    },
  ];
  while (true) {
    const [closest, cindex] = ops.reduce(
      (a, p, i) => (p.closeness < a[0].closeness ? [p, i] : a),
      [ops[0], 0]
    );
    ops.splice(cindex, 1);

    newOps = m.buttons
      .map((b) => ({
        state: applyButton(closest.state, b),
        presses: closest.presses + 1,
      }))
      .filter((v) => valid(v.state))
      .map((v) => ({
        ...v,
        closeness: closeness(v.state),
      }));

    ops.push(...newOps);
    solIndex = newOps.findIndex((o) =>
      o.state.every((v, i) => v == m.joltage[i])
    );
    if (solIndex >= 0) {
      res += newOps[solIndex].presses;
      break;
    }
  }
}

console.log("result: ", res);
