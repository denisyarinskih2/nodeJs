const fs = require("fs");
const csvtojson = require("csvtojson");

const csvFilePath = "hm3/csv/nodejs-hw1-ex1.csv";
const txtFilePath = "hm3/output/output.txt";

const readStream = fs.createReadStream(csvFilePath, "utf-8");
const writeStream = fs.createWriteStream(txtFilePath); // { flags: "a" } if we want to append into the file rather than overwriting it

readStream.on("error", (err) => {
  console.error("Error reading CSV file:", err);
});

writeStream.on("error", (err) => {
  console.error("Error writing to TXT file:", err);
});

csvtojson()
  .fromStream(readStream)
  .subscribe(
    (jsonObj) => {
      writeStream.write(JSON.stringify(jsonObj) + "\n");
    },
    (err) => {
      console.error("Error converting CSV to JSON:", err);
    },
    () => {
      console.log("Conversion completed successfully.");
    }
  );
