/* eslint no-console:0 */
// Entry point for controlling remote devices

// TODO integrate into server

import { Board } from 'johnny-five';
import Particle from 'particle-io';
import fs from 'fs';

import setLeds from './actions/set-leds';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

const runDevices = () => {
  devices.map((device) => {
    const board = new Board({
      io: new Particle({
        token: device.deviceAuthToken,
        deviceId: device.deviceId
      })
    });

    board.on('ready', () => {
      console.log(`Connected to ${board.id}`);

      setLeds(board);
    });

    board.on('fail', () => {
      console.log(`Connection failure on ${board.id}`);
    });
  });
};

export default runDevices;
