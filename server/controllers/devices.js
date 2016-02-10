/* eslint no-console:0, max-nested-callbacks:0 */
/* globals console, setInterval */

/**
 * Initializes x number of devices
 * Registers accessories for each device
 */

import colors from 'colors/safe';

import { registerBoard,
         registerLed,
         registerPiezo,
         registerThermo,
         registerMotion } from './utils/register-hardware';
import { FETCH_ROOM_RESERVATIONS,
         MOCK_ROOM_RESERVATIONS,
         FETCH_ROOM_TEMPERATURE,
         FETCH_ROOM_MOTION } from '../ducks/rooms';
import { CHECK_INTERVAL } from '../constants/values';
import { ROOM_STATUSES_UPDATE } from '../constants/events';

import store from '../store/configure-store';
import socket from '../socket';

const rooms = store().getState().roomsReducer;

export default {
  initRooms() {
    socket.open(ROOM_STATUSES_UPDATE, rooms);

    if (process.env.MOCKS) {
      console.log(colors.gray.italic('Using mock data'));
    }

    rooms.map((room) => {
      // Initialize board
      const board = registerBoard(room);

      board.on('ready', () => {
        console.log(colors.grey.bgBlue(`Connected to ${board.id}`));

        // Register room accessories
        const accessories = {
          led: registerLed(board),
          piezo: registerPiezo(board),
          thermo: registerThermo(board),
          motion: registerMotion(board)
        };

        store().dispatch({
          type: FETCH_ROOM_TEMPERATURE,
          room,
          accessories
        });

        store().dispatch({
          type: FETCH_ROOM_MOTION,
          room,
          accessories
        });

        // Set interval for checking and responding to room state
        setInterval(() => {
          if (process.env.MOCKS) {
            store().dispatch({
              type: MOCK_ROOM_RESERVATIONS,
              room,
              accessories
            });

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
  },
  getRooms() {
    return rooms;
  }
};
