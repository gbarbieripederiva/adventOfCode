// Find problem at: https://adventofcode.com/2025/day/8

// Format of inputs is a newline separated list of a r"(\d+,\d+,\d+)"
// Solution tested with node v22.9.0

const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const pairsToFind = argv.length > 3 ? parseInt(argv[3]) : 1000;
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

distance = (p1, p2) =>
  Math.sqrt(
    [0, 1, 2].map((i) => Math.pow(p1[i] - p2[i], 2)).reduce((v, a) => v + a, 0)
  );

let connections = [];
for (let i = 0; i < lines.length; i++) {
  for (let j = i + 1; j < lines.length; j++) {
    connections.push([distance(lines[i], lines[j]), i, j]);
  }
}
connections = connections.sort((a, b) => a[0] - b[0]);

let cluster = [];
for (let i = 0; i < Math.min(pairsToFind, connections.length); i++) {
  const c = connections[i];
  let c1 = -1,
    c2 = -1;
  for (let j = 0; j < cluster.length; j++) {
    if (cluster[j].has(c[1])) {
      c1 = j;
    } else if (cluster[j].has(c[2])) {
      c2 = j;
    }
  }
  if (c1 >= 0 && c2 < 0) {
    cluster[c1].add(c[2]);
  } else if (c1 < 0 && c2 >= 0) {
    cluster[c2].add(c[1]);
  } else if (c1 >= 0 && c2 >= 0) {
    cluster[c1] = new Set([...cluster[c1], ...cluster[c2]]);
    cluster.splice(c2, 1);
  } else {
    cluster.push(new Set([c[1], c[2]]));
  }
}
for (let i = 0; i < lines.length; i++) {
  if (!cluster.some((v) => v.has(i))) cluster.push(new Set([i]));
}
cluster = cluster.sort((a, b) => b.size - a.size);
res = cluster[0].size * cluster[1].size * cluster[2].size;

console.log("result: ", res);
