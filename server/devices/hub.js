/* eslint no-console:0 */
// Entry point for controlling remote devices

// TODO integrate into server

import { Board, Led } from 'johnny-five';
import Particle from 'particle-io';
import fs from 'fs';

import { flashOne } from './actions/led-flashes';

import {
  PHOTON_PINS
} from './constants/values';

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

      const led = new Led.RGB({
        pins: PHOTON_PINS,
        id: board.id,
        board
      });

      flashOne(led, device.deviceId);
    });

    board.on('fail', () => {
      console.log(`Connection failure on ${board.id}`);
    });
  });
};

export default runDevices;
