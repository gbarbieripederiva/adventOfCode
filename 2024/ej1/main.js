// Find problem at: https://adventofcode.com/2024/day/1

// Format of inputs is a newline separated list of a pair of numbers separated
// by a tab. File should be named input.txt and be under the same folder

// Solution tested with node v20.12.2

// This solution is rediculously inneficient. Far better solutions are posible
// even in javascript
const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
// console.log("fileInfo: ", fileInfo);

let firstList = [];
let secondList = [];
for (let l of fileInfo.split("\n")) {
  let numbers = l.split("   ").map((v) => parseInt(v));
  firstList.push(numbers[0]);
  secondList.push(numbers[1]);
}
// console.log("firstList: ", firstList);
// console.log("secondList: ", secondList);

let firstSorted = firstList.sort();
let secondSorted = secondList.sort();
// console.log("firstSorted: ", firstSorted);
// console.log("secondSorted: ", secondSorted);

let sum = 0;
for (let i = 0; i < firstSorted.length; i++) {
  sum += Math.abs(firstSorted[i] - secondSorted[i]);
}

console.log("difference is:", sum);
