/* eslint no-console:0, max-nested-callbacks:0, array-callback-return:0 */
/* globals console, setInterval, clearInterval */

/**
 * Initializes x number of devices
 * Registers accessories for each device
 */

import consoleController from './console';
import store from '../store';
import { config } from '../environment';
import { registerBoard,
         registerLed,
         registerPiezo,
         registerThermo,
         registerMotion } from '../utils';
import { EMIT_INIT_SOCKETS } from '../ducks/clients';
import { FETCH_ROOM_RESERVATIONS,
         FETCH_ROOM_TEMPERATURE,
         FETCH_ROOM_MOTION,
         EMIT_SET_ROOM_ACCESSORIES,
         EMIT_ROOM_MODULE_FAILURE } from '../ducks/rooms';
import { CHECK_INTERVAL } from '../constants';

const devicesController = {
  getRooms() {
    const { rooms } = store.getState().roomsReducer.toJS();

    return rooms;
  },

  /**
   * Kicks off setting up and connecting to devices.
   * If devices are disabled, fetches reservations early without starting devices.
   * @returns {undefined}
   */
  initialize() {
    store.dispatch({
      type: EMIT_INIT_SOCKETS,
      publicConfig: config.public
    });

    const fetchRoomReservations = () => store.dispatch({ type: FETCH_ROOM_RESERVATIONS });
    fetchRoomReservations();

    if (process.env.DISABLE_DEVICES) {
      return;
    }

    devicesController.getRooms().map((room) => {
      const board = registerBoard(room);

      board.on('ready', () => devicesController.boardReady(board, room));
      board.on('warn', consoleController.logBoardWarn);
      board.on('exit', (event) => {
        consoleController.logBoardFail(event);
        devicesController.boardFail(room);
      });
    });

    // Catches exceptions caused by individual modules, keeping system online
    process.on('uncaughtException', (error) => {
      console.log('Exception caught');
      console.info(error.stack);
    });

    // Set interval for checking and responding to room state
    const monitorExternalServices = setInterval(() => {
      fetchRoomReservations();

      if (process.env.MOCKS) {
        // No need to continually check mock data for updates
        clearInterval(monitorExternalServices);
      }
    }, CHECK_INTERVAL);
  },

  /**
   * Top-level scope for handling an individual room's
   *  board accessories and reservations.
   * Kicks off actions to monitor accessory states, updating server state as necessary.
   * @param {object} board JohnnyFive board object.
   * @param {object} room Corresponding room object.
   * @returns {undefined}
   */
  boardReady(board, room) {
    board.samplingInterval(2000);
    consoleController.logBoardReady(board, room);

    // Register all possible accessories
    const accessories = {
      led: registerLed(board),
      piezo: registerPiezo(board),
      thermo: registerThermo(board),
      motion: registerMotion(board)
    };

    store.dispatch({
      type: EMIT_SET_ROOM_ACCESSORIES,
      room,
      accessories
    });

    if (config.public.enableTemperature) {
      store.dispatch({
        type: FETCH_ROOM_TEMPERATURE,
        room,
        accessories
      });
    }

    if (config.public.enableMotion) {
      store.dispatch({
        type: FETCH_ROOM_MOTION,
        room,
        accessories
      });
    }
  },

  boardFail(room) {
    store.dispatch({
      type: EMIT_ROOM_MODULE_FAILURE,
      room
    });
  }
};

export default devicesController;
