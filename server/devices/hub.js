/* eslint no-console:0 */
// Entry point for controlling remote devices

// TODO integrate into server

import { Board } from 'johnny-five';
import Particle from 'particle-io';
import fs from 'fs';
import http from 'http';

import state from '../state';
import { initializeDeviceState, updateDeviceState } from './actions/update-state';
import setLeds from './actions/set-leds';
import { FETCH_ROOM_RESERVATIONS } from './constants/urls';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

const runDevices = () => {
  devices.map((device) => {
    // Initialize persistent state
    initializeDeviceState(state, device);

    const source = `${FETCH_ROOM_RESERVATIONS}/${device.outlookAccount}`;

    // Retrieve outlook room reservation statuses
    http.get(source, (response) => {
      // response.setEncoding('utf8');
      response.on('data', (newState) => {
        updateDeviceState(state, device, newState);

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
    }).on('error', (error) => {
      const errorMessage = `Failed to fetch room reservations
                    for ${device.outlookAccount}. \n
                    ${error}`;

      console.log(errorMessage);
    });
  });
};

export default runDevices;
