/* eslint no-console:0, max-nested-callbacks:0 */
/* globals console, setInterval, clearInterval */

/**
 * Initializes x number of devices
 * Registers accessories for each device
 */

import colors from 'colors/safe';

import {
  registerBoard,
  registerLed,
  registerPiezo,
  registerThermo
} from './helpers/register-hardware';
import {
  FETCH_ROOM_RESERVATIONS,
  MOCK_ROOM_RESERVATIONS,
  FETCH_ROOM_TEMPERATURE
} from '../ducks/rooms';
import { CHECK_INTERVAL } from '../constants/values';

import store from '../store/configure-store';

const { rooms } = store().getState();

export default {
  run() {
    rooms.map((room) => {
      // Initialize board
      const board = registerBoard(room);

      board.on('ready', () => {
        console.log(colors.grey.bgBlue(`Connected to ${board.id}`));

        // Register room accessories
        const accessories = {
          led: registerLed(board),
          piezo: registerPiezo(board),
          thermo: registerThermo(board)
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

            store().dispatch({
              type: FETCH_ROOM_TEMPERATURE,
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

          store().dispatch({
            type: FETCH_ROOM_TEMPERATURE,
            room,
            accessories
          });
        }, CHECK_INTERVAL);
      });

      board.on('fail', () => {
        console.log(`Connection failure to ${board.id}`);
      });
    });
  }
};
