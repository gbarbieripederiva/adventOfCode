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

function applyButton(state, button, times) {
  if (times == 0) return state;
  let newState = [...state];
  for (const b of button) {
    newState[b] += times;
  }
  return newState;
}

for (const m of machines) {
  console.log("Doing machine:", m.id);

  function solvedState(state) {
    return state.every((v, i) => v == m.joltage[i]);
  }

  function maxForButton(state, b) {
    let max = null;
    for (const v of b) {
      let missing = m.joltage[v] - state[v];
      if (max == null) max = missing;
      else max = Math.min(max, missing);
    }
    return max;
  }

  function valuesForButton(state, b) {
    let max = maxForButton(state, b) + 1;
    return max < 0 ? [] : [...new Array(max).keys()];
  }

  let min = null,
    pending = [
      {
        presses: Array(m.buttons.length).fill(null),
        state: Array(m.joltage.length).fill(0),
        firstNullIndex: 0,
      },
    ];
  while (pending.length > 0) {
    let { presses, state, firstNullIndex } = pending.pop();
    let nextB = m.buttons[firstNullIndex];
    if (firstNullIndex == presses.length - 1) {
      let max = maxForButton(state, nextB);
      state = applyButton(state, nextB, max);
      if (solvedState(state)) {
        let total = presses.reduce((a, c) => a + (c ?? 0), max);
        if (min == null || total < min) {
          min = total;
        }
      }
    } else {
      pending.push(
        ...valuesForButton(state, nextB).map((v) => ({
          presses: presses.with(firstNullIndex, v),
          state: applyButton(state, nextB, v),
          firstNullIndex: firstNullIndex + 1,
        }))
      );
    }
  }

  res += min;
}

console.log("result: ", res);
