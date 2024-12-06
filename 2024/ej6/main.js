// Find problem at: https://adventofcode.com/2024/day/6
// This script should be run witho node v22.9.0
//
// An `input.txt` file is required in the same folder the solution is in
//
// The format is a textfile grid of . # and one ^
const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
const grid = fileInfo.split("\n").slice(0, -2).map(v => v.split("").slice(0, -2));

let sumDistinct = 0;

// Calculate starting position
let x = 0, y = 0;
for (let i = 0, found = false; i < grid.length && !found; i++) {
  for (let j = 0; j < grid[i].length && !found; j++) {
    if (grid[i][j] == '^') {
      y = i;
      x = j;
      grid[i][j] = 'x'
      sumDistinct++;
      found = true;
    }
  }
}


console.log(`Starting position is: ${x}, ${y}`);

let dirX = 0, dirY = -1;
let numMoves = 0;
x += dirX;
y += dirY;
const MAX_MOVES = 1000000;
while (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length && numMoves < MAX_MOVES) {
  if (grid[y][x] == '.') {
    grid[y][x] = 'x';
    sumDistinct++;
  } else if (grid[y][x] == '#') {
    x -= dirX;
    y -= dirY;
    let prevDirY = dirY;
    dirY = dirY != 0 ? 0 : dirX;
    dirX = dirX != 0 ? 0 : (- 1 * prevDirY);
    numMoves--;
  }
  x += dirX;
  y += dirY;
  numMoves++;
}
if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
  if (grid[y][x] == '#') {
    x -= dirX;
    y -= dirY;
    numMoves--;
  }
  if (dirY == -1) {
    grid[y][x] = '^';
  } else if (dirX == 1) {
    grid[y][x] = '>';
  } else if (dirY == 1) {
    grid[y][x] = 'v';
  } else {
    grid[y][x] = '<';
  }
}

fs.writeFileSync(path.join(__dirname, "dumpGrid.txt"), grid.map(v => v.join("")).join("\n"));

console.log(`Finished going through ${sumDistinct} different places with ${numMoves} moves`);
