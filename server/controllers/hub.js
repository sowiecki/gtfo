/* eslint no-console:0, max-nested-callbacks:0 */

/**
 * Initializes x number of remote devices
 * Registers accessories for each device
 */

import fs from 'fs';
import http from 'http';

import state from '../state';
import { initializeDeviceState } from './helpers/update-state';
import configureAccessories from './helpers/configure-accessories';
import { registerBoard, registerLed } from './helpers/register-hardware';
import { HOST, FETCH_ROOM_RESERVATIONS } from '../constants/urls';
import { CHECK_INTERVAL } from '../constants/values';
import mockRoomData from '../../mock-data';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

const runDevices = () => {
  devices.map((device) => {
    // Initialize board
    const board = registerBoard(device);

    // Initialize empty semi-persistent state
    initializeDeviceState(state, device);

    const source = `${HOST}${FETCH_ROOM_RESERVATIONS}${device.outlookAccount}`;

    board.on('ready', () => {
      console.log(`Connected to ${board.id}`);

      // Register device accessories
      const accessories = {
        led: registerLed(board)
      };

      // Set interval for checking and responding to room state
      setInterval(() => {
        if (process.env.MOCKS) {
          const roomState = mockRoomData[device.outlookAccount];
          configureAccessories(device, roomState, accessories);
          return;
        }

        // Retrieve outlook room reservation statuses
        http.get(source, (response) => {
          response.on('data', (data) => {
            const roomState = JSON.parse(data.toString('utf8'));

            // Configure device accessories according to room state
            configureAccessories(device, roomState, accessories);
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
