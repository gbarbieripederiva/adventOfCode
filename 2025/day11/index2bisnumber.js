// Find problem at: https://adventofcode.com/2025/day/11

// Format of inputs is a newline separated list of a r".+:( .*)"
// Solution tested with node v22.9.0

const { debug } = require("console");
const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const filepath = argv.length > 2 ? argv[2] : null;
const fileInfo = fs
  .readFileSync(
    filepath != null ? filepath : path.join(__dirname, "input_test2.txt")
  )
  .toString();
// console.log("fileInfo: ", fileInfo);

const lines = fileInfo
  .split("\n")
  .map((v) =>
    v.length > 0
      ? {
          device: v.split(":")[0],
          outputs: v
            .split(":")[1]
            .split(" ")
            .filter((v) => v.length > 0),
        }
      : null
  )
  .filter((v) => v != null);
let repeatedDevices = lines.map((v) => [v.device, ...v.outputs]).flat();
let distinctDeviceList = repeatedDevices.filter(
  (v, i) => repeatedDevices.findIndex((v2) => v2 == v) == i
);
let devicesTranslator = Object.fromEntries(
  distinctDeviceList.map((v, i) => [v, i])
);
let devicesFinder = Object.fromEntries(
  lines.map((v, i) => [
    i,
    {
      device: devicesTranslator[v.device],
      outputs: v.outputs.map((v) => devicesTranslator[v]),
    },
  ])
);
let res = 0;

function findDevice(device) {
  return devicesFinder[device];
}

let dac = devicesTranslator["dac"];
let fft = devicesTranslator["fft"];
let stack = [
  ...findDevice(devicesTranslator["svr"]).outputs.map((v) => ({
    d: v,
    dac: v == dac,
    fft: v == fft,
  })),
];
let paths = 0;
while (stack.length > 0) {
  let next = stack.pop();
  if (next.d == "out") {
    if (next.dac && next.fft) {
      paths++;
    }
  } else {
    let d = findDevice(next.d);
    if ((d?.outputs?.length ?? 0) > 0) {
      stack.push(
        ...d.outputs.map((v) => ({
          d: v,
          dac: next.dac || v == dac,
          fft: next.fft || v == fft,
        }))
      );
    }
  }
}

res = paths;

console.log("result: ", res);
