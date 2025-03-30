// Find problem at: https://adventofcode.com/2024/day/8
// This script should be run witho node v22.9.0
//
// An `input.txt` file is required in the same folder the solution is in
//
// The format is a textfile grid of . and letters/numbers
const fs = require("fs");
const path = require("path");

const fileInfo = fs.readFileSync(path.join(__dirname, "input.txt")).toString();
const grid = fileInfo.split('\n').map(v => v.split(''));

const antennas = {}
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] != '.') {
      const anntena = grid[i][j];
      if (typeof antennas[anntena] === 'undefined') {
        antennas[anntena] = [];
      }
      antennas[anntena].push([i, j]);
    }
  }
}

const gCopy = [...grid.map(v => [...v])]
const inBounds = (p) => p[0] >= 0 && p[0] < grid.length && p[1] >= 0 && p[1] < grid[p[0]].length;
const calculateMCD = (a, b) => {
  let d = 1;
  for (let pd = 1; pd <= a && pd <= b; pd++) {
    if (a % pd == 0 && b % pd == 0) d = pd;
  }
  return d;
}
for (let a in antennas) {
  const points = antennas[a];
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];
      const rawdifX = p1[0] - p2[0];
      const rawdifY = p1[1] - p2[1];
      const mcd = calculateMCD(Math.abs(rawdifX), Math.abs(rawdifY));

      const difX = rawdifX / mcd;
      const difY = rawdifY / mcd;

      for (
        let a = [
          p1[0] + difX,
          p1[1] + difY,
        ];
        inBounds(a);
        a = [
          a[0] + difX,
          a[1] + difY,
        ]) {
        gCopy[a[0]][a[1]] = "#";
      }
      for (
        let a = [
          p1[0] - difX,
          p1[1] - difY,
        ];
        inBounds(a);
        a = [
          a[0] - difX,
          a[1] - difY,
        ]) {
        if (a[0] != p2[0] && a[1] != p2[1]) gCopy[a[0]][a[1]] = "#";
      }
    }
  }
}
const antinodes = gCopy.reduce((prev, curr) => prev + (curr.reduce((prev, curr) => prev + (curr == '#' ? 1 : 0), 0)), 0);

fs.writeFileSync(path.join(__dirname, "dump.txt"), gCopy.map(v => v.join("")).join("\n"))
console.log(`There are ${antinodes} antinodes`);
