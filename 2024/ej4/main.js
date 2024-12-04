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
const word = "XMAS";

let sum = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] == word[0]) {
      for (let k = Math.max(i - 1, 0); k <= i + 1 && k < grid.length; k++) {
        for (let l = Math.max(j - 1, 0); l <= j + 1 && l < grid[k].length; l++) {
          if (grid[k][l] == word[1]) {
            const dirI = k - i;
            const dirJ = l - j;

            let matches = true;
            for (let wp = 2; wp < word.length && matches; wp++) {
              if (i + dirI * wp < 0 || i + dirI * wp >= grid.length || j + dirJ * wp < 0 || j + dirJ * wp >= grid[i + dirI * wp].length) {
                matches = false;
              } else if (grid[i + dirI * wp][j + dirJ * wp] != word[wp]) {
                matches = false;
              }
            }
            if (matches) {
              sum++;
            }
          }
        }
      }
    }
  }
}

console.log("The sum is: ", sum);
