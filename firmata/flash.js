/* eslint no-console:0 */
/* globals console */

require('babel-core/register');

const Particle = require('particle-api-js');
const { devices } = require('../server/environment');

const particle = new Particle();

const FIRMATA_PATH = './gtfo-direct.ino';

devices.forEach((device) => {
  particle.flashDevice({
    deviceId: device.deviceId,
    auth: device.deviceAuthToken,
    files: {
      file1: FIRMATA_PATH
    }
  }).then((data) => {
    console.log('Device flashing started successfully:', data);
  }, (err) => {
    console.log('An error occurred while flashing the device:', err);
  });
});
