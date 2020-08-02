import fs from 'fs';
import readline from 'readline';
import path from 'path';
import csvtojson from 'csvtojson';

const csvReadPath = path.join(__dirname, 'ex2Read.csv');
const txtWritePath = path.join(__dirname, 'ex2Write.txt');

const csvReadStream = fs.createReadStream(csvReadPath);
csvReadStream.on('error', (err) => {
  console.error('csvReadStream error: ', err.message);
});
const txtWriteStream = fs.createWriteStream(txtWritePath, { flags: 'w' });

let isFirstLine = true;
const parseOperations = [];
const rl = readline.createInterface({
  input: csvReadStream,
});
rl.on('line', (line) => {
  if (isFirstLine) {
    isFirstLine = false;
    return;
  }
  parseOperations.push(
    (async function () {
      const json = (await csvtojson({ noheader: true }).fromString(line))[0];
      const book = {
        Book: json.field1,
        Author: json.field2,
        Amount: json.field3,
        Price: json.field4,
      };
      txtWriteStream.write(JSON.stringify(book) + '\n');
    })()
  );
});
rl.on('close', async () => {
  await Promise.all(parseOperations);
  console.log('Files have been uploaded');
});
