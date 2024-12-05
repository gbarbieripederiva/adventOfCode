// Find problem at: https://adventofcode.com/2024/day/5
// This script should be run witho node v22.9.0
//
// An `input.txt` file is required in the same folder the solution is in
//
// The format is a textfile with two halfs separated by an empty line. First
// half has orderings in "number|number" format. Second half has lists of 
// comma separated numbers
const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
const lines = fileInfo.split('\n');
const splitPos = lines.indexOf("");

const ordering = lines.slice(0, splitPos).map((v) => v.match(/\d+/g).map((n) => parseInt(n)));
const instructions = lines.slice(splitPos + 1, lines.length - 1).map((v) => v.match(/\d+/g).map((n) => parseInt(n)));

const orderMap = {};
for (let oo of ordering) {
  if (typeof orderMap[oo[0]] === 'undefined') {
    orderMap[oo[0]] = {};
  }
  orderMap[oo[0]][oo[1]] = true;
}

let isValidOrder = (prev, curr) => {
  if (typeof orderMap[prev] === 'undefined') {
    return true;
  } else {
    return !!orderMap[prev][curr];
  }
}

let sum = 0, validInstructions = 0;
let sumInvalid = 0, invalidInstructions = 0;
for (let ins of instructions) {
  let isValid = true;
  for (let i = 0; i < ins.length && isValid; i++) {
    for (let j = i+1; j < ins.length && isValid; j++) {
      isValid = isValidOrder(ins[i], ins[j]);
    }
  }
  if (isValid) {
    validInstructions++;
    sum += ins[Math.floor(ins.length / 2)];
  } else {
    ins.sort((a, b) => isValidOrder(a, b) ? 1 : -1);
    sumInvalid += ins[Math.floor(ins.length / 2)];
    invalidInstructions++;
  }
}

// Part one
console.log(`Sum is: ${sum} with ${validInstructions} valid instructions`);
// Part two
console.log(`Sum with invalid is: ${sum + sumInvalid} adding ${sumInvalid} for the ${invalidInstructions} invalid instructions`);
