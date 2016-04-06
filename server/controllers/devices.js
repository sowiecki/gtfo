/* eslint no-console:0, max-nested-callbacks:0, array-callback-return:0 */
/* globals console, setInterval, clearInterval */

/**
 * INITIALIZE_ROOMSs x number of devices
 * Registers accessories for each device
 */

import store from '../store';

import { config } from '../environment';
import { registerBoard,
         registerLed,
         registerPiezo,
         registerThermo,
         registerMotion,
         logBoardReady,
         logBoardWarning,
         logBoardFailure } from '../utils';
import { EMIT_INIT_SOCKETS,
         FETCH_ROOM_RESERVATIONS,
         FETCH_ROOM_TEMPERATURE,
         FETCH_ROOM_MOTION } from '../ducks/rooms';
import { CHECK_INTERVAL } from '../constants';

const devicesController = {
  initialize() {
    store.dispatch({ type: EMIT_INIT_SOCKETS });

    devicesController.getRooms().map((room) => {
      if (process.env.DISABLE_DEVICES) {
        /**
         * If devices are disabled, fetch reservations earlier
         * and exit scope before creating board objects.
         */
        store.dispatch({ type: FETCH_ROOM_RESERVATIONS, room });

        return;
      }

      const board = registerBoard(room);

      board.on('ready', devicesController.connectToRoom.bind(null, board, room));
      board.on('warn', logBoardWarning);
      board.on('fail', logBoardFailure);
    });
  },

  connectToRoom(board, room) {
    logBoardReady(board);

    // Register all possible accessories
    const accessories = {
      led: registerLed(board),
      piezo: registerPiezo(board),
      thermo: registerThermo(board),
      motion: registerMotion(board)
    };

    if (config.public.enableTemperature) {
      store.dispatch({
        type: FETCH_ROOM_TEMPERATURE,
        room,
        accessories
      });
    }

    store.dispatch({
      type: FETCH_ROOM_MOTION,
      room,
      accessories
    });

    // Set interval for checking and responding to room state
    const monitorRoomReservations = setInterval(() => {
      // Retrieve outlook room reservation statuses
      store.dispatch({
        type: FETCH_ROOM_RESERVATIONS,
        room,
        accessories
      });

      if (process.env.MOCKS) {
        // No need to continually check mock data for updates
        clearInterval(monitorRoomReservations);
      }
    }, CHECK_INTERVAL);
  },

  getRooms() {
    const { rooms } = store.getState().roomsReducer;

    return rooms;
  }
};

export default devicesController;
