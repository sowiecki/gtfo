/* eslint no-console:0, max-nested-callbacks:0, array-callback-return:0 */
/* globals console, setInterval, clearInterval */

/**
 * INITIALIZE_ROOMSs x number of devices
 * Registers accessories for each device
 */

import colors from 'colors/safe';

import store from '../store/configure-store';

import { config } from '../environment';
import { registerBoard,
         registerLed,
         registerPiezo,
         registerThermo,
         registerMotion,
         logBoardWarning,
         logBoardFailure } from '../utils';
import { EMIT_INIT_DEVICES,
         FETCH_ROOM_RESERVATIONS,
         FETCH_ROOM_TEMPERATURE,
         FETCH_ROOM_MOTION } from '../ducks/rooms';
import { CHECK_INTERVAL } from '../constants';

const rooms = store().getState().roomsReducer;

const devicesController = {
  initRooms() {
    store().dispatch({ type: EMIT_INIT_DEVICES });

    rooms.map((room) => {
      // INITIALIZE_ROOMS board
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

        if (config.public.enableTemperature) {
          store().dispatch({
            type: FETCH_ROOM_TEMPERATURE,
            room,
            accessories
          });
        }

        store().dispatch({
          type: FETCH_ROOM_MOTION,
          room,
          accessories
        });

        // Set interval for checking and responding to room state
        const monitorRoomReservations = setInterval(() => {
          // Retrieve outlook room reservation statuses
          store().dispatch({
            type: FETCH_ROOM_RESERVATIONS,
            room,
            accessories
          });

          if (process.env.MOCKS) {
            // No need to continually check mock data for updates
            clearInterval(monitorRoomReservations);
          }
        }, CHECK_INTERVAL);
      });

      board.on('warn', logBoardWarning);
      board.on('fail', logBoardFailure);
    });
  },
  getRooms() {
    return rooms;
  }
};

export default devicesController;
