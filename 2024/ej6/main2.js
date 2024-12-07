// Find problem at: https://adventofcode.com/2024/day/6
// This script should be run witho node v22.9.0
//
// An `input.txt` file is required in the same folder the solution is in
//
// The format is a textfile grid of . # and one ^
const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
const grid = fileInfo.split("\n").map(v => v.split(""));

// Calculate starting position
let dirsToPos = (dirs) => dirs.map(v => v.map(e => e + 4).join("")).join("");
let posToDirs = (s) => s.match(/\d\d/g).map(v => [parseInt(v[0]) - 4, parseInt(v[1]) - 4]);

let x = 0, y = 0;
for (let i = 0, found = false; i < grid.length && !found; i++) {
  for (let j = 0; j < grid[i].length && !found; j++) {
    if (grid[i][j] == '^') {
      y = i;
      x = j;
      grid[y][x] = dirsToPos([[0, -1]]);
      found = true;
    }
  }
}

function caughtInLoop(grid, initPos) {
  let dirX = 0, dirY = -1;
  let x = initPos[0], y = initPos[1];
  x += dirX;
  y += dirY;
  while (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
    if (grid[y][x] == '#') {
      x -= dirX;
      y -= dirY;
      let prevDirY = dirY;
      dirY = dirY != 0 ? 0 : dirX;
      dirX = dirX != 0 ? 0 : (- 1 * prevDirY);
    } else {
      let prevDirs = [];
      if (grid[y][x] != '.') prevDirs = posToDirs(grid[y][x]);
      if (prevDirs.some((pp) => pp[0] == dirX && pp[1] == dirY)) return true;
      grid[y][x] = dirsToPos([...prevDirs, [dirX, dirY]]);
    }
    x += dirX;
    y += dirY;
  }
  return false;
}

let sum = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] == '.') {
      let gridCopy = [...grid.map(v => [...v])];
      gridCopy[i][j] = '#';
      if (caughtInLoop(gridCopy, [x, y])) {
        sum++;
      }
    }
  }
}

console.log(`There are ${sum} possible locations`)
