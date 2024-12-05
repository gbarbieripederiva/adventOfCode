// Find problem at: https://adventofcode.com/2024/day/1

// Format of inputs is a newline separated list of a pair of numbers separated
// by a tab. File should be named input.txt and be under the same folder

// Solution tested with node v22.9.0

// This solution is rediculously inneficient. Far better solutions are posible
// even in javascript
const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo.split("\n");

let firstList = [];
let secondList = [];
for (let l of lines.slice(0, lines.length - 1)) {
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

let i = 0, j = 0;
let secondSum = 0, appearences = 0;
while(i < firstSorted.length && j < secondSorted.length) {
  if(firstSorted[i] < secondSorted[j]) {
    secondSum += appearences * firstSorted[i];
    appearences = 0;
    i++;
  } else if(firstSorted[i] > secondSorted[j]){
    j++;
  } else {
    j++;
    appearences++;
  }
}
if(i < firstSorted.length) {
  secondSum += appearences * firstSorted[i];
}

console.log("The sum is: ", secondSum);
