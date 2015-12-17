/* eslint no-console:0, max-nested-callbacks:0 */

/**
 * Initializes x number of devices
 * Registers accessories for each device
 */

import colors from 'colors/safe';

import { registerBoard, registerLed } from './helpers/register-hardware';
import {
  FETCH_ROOM_RESERVATIONS,
  MOCK_ROOM_RESERVATIONS
} from '../ducks/rooms';
import { CHECK_INTERVAL } from '../constants/values';

import store from '../store/configure-store';

const { rooms } = store().getState();

const runDevices = () => {
  rooms.map((room) => {
    // Initialize board
    const board = registerBoard(room);

    board.on('ready', () => {
      console.log(colors.grey.bgBlue(`Connected to ${board.id}`));

      // Register room accessories
      const accessories = {
        led: registerLed(board)
      };

      // Set interval for checking and responding to room state
      const refetchRoomReservations = setInterval(() => {
        if (process.env.MOCKS) {
          console.log(colors.gray.italic('Using mock data'));

          store().dispatch({
            type: MOCK_ROOM_RESERVATIONS,
            room,
            accessories
          });

          // Mocks are static, no need to constantly recheck
          clearInterval(refetchRoomReservations);
          return;
        }

        // Retrieve outlook room reservation statuses
        store().dispatch({
          type: FETCH_ROOM_RESERVATIONS,
          room,
          accessories
        });
      }, CHECK_INTERVAL);
    });

    board.on('fail', () => {
      console.log(`Connection failure to ${board.id}`);
    });
  });
};

export default runDevices;
