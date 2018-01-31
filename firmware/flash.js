/* eslint no-console:0 */
/* globals console */

require('babel-core/register');

const Particle = require('particle-api-js');
const path = require('path');
const colors = require('colors');
const { devices } = require('../server/environment');

const particle = new Particle();

const FIRMWARE_PATH = path.join(__dirname, './firmware.cpp');

devices.forEach((device) => {
  const flash = particle.flashDevice({
    deviceId: device.deviceId,
    auth: device.deviceAuthToken,
    files: {
      file1: FIRMWARE_PATH
    }
  });

  flash.then((data) => {
    console.log('Device flash result:', JSON.stringify(data));
    const deviceName = colors.green.bold(device.name);
    console.log(`${deviceName} flashing started successfully!`);
  }, (err) => {
    const bodyError = colors.red.bold(err.body.error);
    const deviceName = colors.magenta.bold(device.name);
    console.log(`${deviceName} failed to flash: ${bodyError}`);
  });
});
