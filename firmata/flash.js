/* eslint no-console:0 */
/* globals console */

require('babel-core/register');

const Particle = require('particle-api-js');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const { devices } = require('../server/environment');

// const readFile = (filePath) => JSON.parse(fs.readFileSync(path.join(__dirname, filePath), 'utf8'));

const particle = new Particle();

const FIRMATA_PATH = path.join(__dirname, './gtfo-direct.bin');

devices.forEach((device) => {
  console.log(device)
  particle.flashDevice({
    deviceId: device.deviceId,
    auth: device.deviceAuthToken,
    files: {
      file1: FIRMATA_PATH
    }
  }).then((e) => {
    console.log(e)
    const deviceName = colors.green.bold(device.name);
    console.log(`${deviceName} flashing started successfully!`);
  }, (err) => {
    const bodyError = colors.red.bold(err.body.error);
    const deviceName = colors.magenta.bold(device.name);
    console.log(`${deviceName} failed to flash: ${bodyError}`);
  });
});
