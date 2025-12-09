// Find problem at: https://adventofcode.com/2025/day/9

// Format of inputs is a newline separated list of a r"(\d+,\d+,\d+)"
// Solution tested with node v22.9.0
// https://en.wikipedia.org/wiki/Point_in_polygon
const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const filepath = argv.length > 2 ? argv[2] : null;
const fileInfo = fs
  .readFileSync(filepath != null ? filepath : path.join(__dirname, "input.txt"))
  .toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo
  .split("\n")
  .map((v) => v.split(",").map((v2) => parseInt(v2)));
lines.splice(lines.length - 1, 1);
let res = 0;

function calculateArea(x1, x2) {
  return (Math.abs(x1[0] - x2[0]) + 1) * (Math.abs(x1[1] - x2[1]) + 1);
}

function liesInShape(p) {
  const [x, y] = p;
  const inTheMiddle = (p1, p, p2) =>
    (p1 <= p && p <= p2) || (p2 <= p && p <= p1);
  for (let i = 0; i < lines.length; i++) {
    const [x1, y1] = lines[i - 1 >= 0 ? i - 1 : i - 1 + lines.length];
    const [x2, y2] = lines[i];
    if (
      (x1 == x && x == x2 && inTheMiddle(y1, y, y2)) ||
      (y1 == y && y == y2 && inTheMiddle(x1, x, x2))
    ) {
      return true;
    }
  }

  let hits = 0;
  for (let rx = x; rx >= 0; rx--) {
    let isInLine = false;
    for (let i = 0; i < lines.length; i++) {
      const [x1, y1] = lines[i - 1 >= 0 ? i - 1 : i - 1 + lines.length];
      const [x2, y2] = lines[i];
      if (
        (x1 == rx && rx == x2 && inTheMiddle(y1, y, y2)) ||
        (y1 == y && y == y2 && inTheMiddle(x1, rx, x2))
      ) {
        isInLine = true;
        break;
      }
    }
    if (isInLine) {
      hits++;
    }
  }

  return !(hits % 2 == 0);
}

function rectangleInFigure(x1, x2) {
  x3 = [x1[0], x2[1]];
  x4 = [x2[0], x1[1]];

  return liesInShape(x3) && liesInShape(x4);
}

let biggestSquare = 0;
for (let i = 0; i < lines.length; i++) {
  for (let j = i + 1; j < lines.length; j++) {
    let area = calculateArea(lines[i], lines[j]);
    if (area > biggestSquare && rectangleInFigure(lines[i], lines[j])) {
      biggestSquare = area;
    }
  }
}

res = biggestSquare;

console.log("result: ", res);
