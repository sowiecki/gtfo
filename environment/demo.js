/* eslint no-console:0, no-use-before-define:0 */
/* globals console */
const { lstatSync, writeFileSync } = require('fs');
const readline = require('readline');
const colors = require('colors');

const files = require('./example-files');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

const fileNames = Object.keys(files);

const writeFile = (fileName) => {
  console.log(colors.yellow(`Writing ${fileName}`));

  writeFileSync(`./environment/${fileName}`, JSON.stringify(files[fileName], null, 2));
};

let index = 0;

const proceed = () => {
  if (index === fileNames.length - 1) {
    rl.close();
  } else {
    index++;
    checkFile();
  }
};

const checkFile = () => {
  const fileName = fileNames[index];

  try {
    if (lstatSync(`./environment/${fileName}`).isFile()) {
      const fileExistsWarning = `/environment/${fileName} already exists! Overwrite? [y/N]`;

      rl.question(fileExistsWarning, (answer) => {
        if (answer.toLowerCase() !== 'y') {
          console.log(`Not overwriting ${fileName}.`);
        } else {
          writeFile(fileName);
        }

        proceed();
      });
    }
  } catch (e) {
    writeFile(fileName);

    proceed();
  }
};

fileNames.forEach(() => checkFile());
