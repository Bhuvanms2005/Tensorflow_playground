const fs = require("fs");
const path = require("path");

const inputPath = path.join(
  __dirname,
  "data",
  "data_banknote_authentication.txt"
);

const outputPath = path.join(
  __dirname,
  "data",
  "banknote_playground.csv"
);

const text = fs.readFileSync(inputPath, "utf8").trim();

const rows = text
  .split(/\r?\n/)
  .filter(line => line.trim().length > 0)
  .map(line => line.split(",").map(Number));

if (rows.length !== 1372) {
  throw new Error(`Expected 1372 rows, found ${rows.length}`);
}

const csv = [
  "variance,skewness,class",
  ...rows.map(row => `${row[0]},${row[1]},${row[4]}`)
].join("\n");

fs.writeFileSync(outputPath, csv);

console.log(`Created ${outputPath}`);
console.log(`Rows: ${rows.length}`);