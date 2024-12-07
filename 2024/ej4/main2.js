// Find problem at: https://adventofcode.com/2024/day/4
// This script should be run witho node v22.9.0
//
// An `input.txt` file is required in the same folder the solution is in
//
// The format is a textfile with a grid of uppercase letters
const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
const grid = fileInfo.split("\n");

let sum = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] == 'A' && i > 0 && j > 0 && i < grid.length - 1 && j < grid[i].length - 1) {
      let letters = [grid[i - 1][j - 1], grid[i + 1][j - 1], grid[i - 1][j + 1], grid[i + 1][j + 1]];
      let ms = letters.filter((v) => v == 'M').length
      let ss = letters.filter((v) => v == 'S').length 
      if (ms == 2 && ss == 2 && letters[0] != letters[3]) {
        sum++;
      }
    }
  }
}

console.log("The sum is: ", sum);
