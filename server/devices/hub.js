/* eslint no-console:0 */
// Entry point for controlling remote devices

// TODO integrate into server

import { Board, Led } from 'johnny-five';
import Particle from 'particle-io';
import temporal from 'temporal';
import fs from 'fs';

import { flashOne } from './actions/led-flashes';

import {
  PHOTON_PINS,
  IN,
  OUT
} from './constants/values';

import {
  // RED,
  PURPLE
} from './constants/colors';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

// TODO integrate multiple boards

const board = new Board({
  io: new Particle({
    token: devices[0].deviceAuthToken,
    deviceId: devices[0].deviceId
  })
});

const board2 = new Board({
  io: new Particle({
    token: devices[1].deviceAuthToken,
    deviceId: devices[1].deviceId
  })
});

const hub = () => {
  board.on('ready', () => {
    console.log(`Connected to ${board.id}`);

    const led = new Led.RGB({
      pins: PHOTON_PINS,
      id: board.id,
      board: board
    });

    led.color(PURPLE);
  });

  board2.on('ready', () => {
    console.log(`Connected to ${board.id}`);

    const led = new Led.RGB({
      pins: PHOTON_PINS,
      id: board2.id,
      board: board2
    });

    led.color(PURPLE);
  });
};

export default hub;
