/* eslint no-console:0, max-nested-callbacks:0 */
// Entry point for controlling remote devices

// TODO integrate into server

import { Board, Led } from 'johnny-five';
import Particle from 'particle-io';
import fs from 'fs';
import http from 'http';

import state from '../state';
import { initializeDeviceState } from './actions/update-state';
import setLeds from './actions/set-leds';
import { HOST, FETCH_ROOM_RESERVATIONS } from '../constants/urls';
import { PHOTON_PINS, CHECK_INTERVAL } from '../constants/values';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

const runDevices = () => {
  devices.map((device) => {
    // Initialize board
    const board = new Board({
      io: new Particle({
        token: device.deviceAuthToken,
        deviceId: device.deviceId
      })
    });

    // Initialize semi-persistent state
    initializeDeviceState(state, device);

    const source = `${HOST}${FETCH_ROOM_RESERVATIONS}${device.outlookAccount}`;

    board.on('ready', () => {
      console.log(`Connected to ${board.id}`);

      const led = new Led.RGB({
        pins: PHOTON_PINS,
        id: board.id,
        board
      });

      setInterval(() => {
        // Retrieve outlook room reservation statuses
        http.get(source, (response) => {
          response.on('data', (data) => {
            const roomState = JSON.parse(data.toString('utf8'));

            setLeds(device, led, roomState);
          });
        }).on('error', (error) => {
          const errorMessage = `Failed to fetch room reservations
                                for ${device.outlookAccount}. \n
                                ${error}`;

          console.log(errorMessage);
        });
      }, CHECK_INTERVAL);
    });

    board.on('fail', () => {
      console.log(`Connection failure on ${board.id}`);
    });
  });
};

export default runDevices;
