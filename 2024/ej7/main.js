// Find problem at: https://adventofcode.com/2024/day/7
// This script should be run witho node v22.9.0
//
// An `input.txt` file is required in the same folder the solution is in
//
// The format is a textfile with a number, followed by :, followed by space
// separated numbers
const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
const equations = fileInfo.split("\n").map(v => v.match(/\d+/g).map(e => parseInt(e)));

function applyOpArr(eq, ops) {
  let res = eq[0];
  for (let i = 0; i < ops.length; i++) {
    let op = ops[i]
    if(op == '+') res = res + eq[i + 1];
    else if(op == '*') res = res * eq[i + 1];
    else throw Error('Invalid op');
  }
  return res;
}

function isValidEq(eq) {
  let operations = new Array(eq.length - 2).fill('+');
  let leftSide = eq[0];
  let operands = eq.slice(1);
  let isValid = false;
  let overflow = false;
  while(!isValid && !overflow) {
    if(applyOpArr(operands, operations) == leftSide) {
      isValid = true;
    } else {
      let found = false;
      for(let i = operations.length - 1; i >= 0 && !found; i--){
        if(operations[i] == '+') {
          operations[i] = '*'
          found = true;
        } else {
          operations[i] = '+';
        }
      }
      if(!found) {
        overflow = true;
      }
    }
  }

  return isValid;
}

let sum = 0;
for (let eq of equations) {
  if(isValidEq(eq)) {
    sum += eq[0];
  }
}

console.log(`Sum is: ${sum}`);
