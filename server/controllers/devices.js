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
         FETCH_ROOM_MOTION,
         SEND_ROOMS_UPDATE } from '../ducks/rooms';
// import { SEND_LAYOUT_UPDATE } from '../ducks/layout';
import { CHECK_INTERVAL } from '../constants/values';

import store from '../store/configure-store';

const { roomsReducer } = store().getState();
const { rooms } = store().getState().roomsReducer;

export default {
  initRooms() {
    if (process.env.MOCKS) {
      console.log(colors.gray.italic('Using mock data'));
    }

    roomsReducer.map((room) => {
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
          store().dispatch({
            type: SEND_ROOMS_UPDATE
          });

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
