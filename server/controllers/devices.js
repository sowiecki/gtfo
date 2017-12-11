/* eslint no-console:0, max-nested-callbacks:0, array-callback-return:0 */
/* globals console, setInterval, clearInterval */

/**
 * Initializes x number of devices
 * Registers accessories for each device
 */

import Particle from 'particle-api-js';
import { find, isEmpty } from 'lodash';
import colors from 'colors';

import consoleController from './console';
import store from '../store';
import { config } from '../environment';
import { shouldOverrideMotion,
  registerBoard,
  registerLed,
  registerPiezo,
  registerThermo,
  registerMotion,
  secureRooms,
  logUnhandledMotionUpdate } from '../utils';
import { EMIT_INIT_SOCKETS } from '../ducks/clients';
import { FETCH_ROOM_RESERVATIONS,
  FETCH_ROOM_TEMPERATURE,
  FETCH_ROOM_MOTION,
  EMIT_SET_ROOM_ACCESSORIES,
  EMIT_ROOM_MODULE_FAILURE,
  EMIT_ROOM_MOTION_UPDATE } from '../ducks/rooms';
import { RESERVATIONS_CHECK_INTERVAL, RUN_DIRECT } from '../constants';

const particle = new Particle();

const devicesController = {
  getRooms: () => store.getState().roomsReducer.toJS().rooms,

  getSecureRooms: () => secureRooms(devicesController.getRooms()),

  getReservations: (req, res) => res.json(devicesController.getSecureRooms()),

  /**
   * Kicks off setting up and connecting to devices.
   * If devices are disabled, fetches reservations early without starting devices.
   * @returns {undefined}
   */
  initialize() {
    const devicesEnabled = !process.env.DISABLE_DEVICES;
    const runningDirect = process.env.RUN_MODE === RUN_DIRECT;
    const overrides = {
      enableMotion: shouldOverrideMotion(devicesController.getRooms())
    };

    store.dispatch({
      type: EMIT_INIT_SOCKETS,
      config,
      overrides
    });

    const fetchRoomReservations = () => store.dispatch({ type: FETCH_ROOM_RESERVATIONS });
    fetchRoomReservations();

    // Set interval for checking and responding to room state
    setInterval(() => {
      fetchRoomReservations();
    }, RESERVATIONS_CHECK_INTERVAL);

    if (devicesEnabled && runningDirect) {
      devicesController.updateDirect();
    }
  },

  updateDirect() {
    devicesController.getRooms().map((room) => {
      if (!isEmpty(room.deviceAuthToken)) {
        const board = registerBoard(room);

        board.on('ready', () => devicesController.boardReady(board, room));
        board.on('warn', consoleController.logBoardWarn);
        board.on('fail', (event) => {
          consoleController.logBoardFail(event);
          devicesController.boardFail(room);
        });
      }
    });

    // Catches exceptions caused by individual modules, keeping system online
    process.on('uncaughtException', (error) => {
      consoleController.log('Exception caught');
      consoleController.log(error.stack);
    });
  },

  updateIndirect(room) {
    particle.callFunction({
      deviceId: room.get('deviceId'),
      auth: room.get('deviceAuthToken'),
      name: 'status',
      argument: room.get('alert')
    }).then((data) => {
      const deviceName = colors.green.bold(room.get('name'));
      consoleController.log(`Successfully updated status of ${deviceName}`);

      store.dispatch({
        type: EMIT_SET_ROOM_ACCESSORIES,
        room,
        connectionStatus: data.body.connected
      });
    }, (err) => {
      const bodyError = colors.red.bold(err.body.error);
      const deviceName = colors.magenta.bold(room.get('name'));
      consoleController.log(`${err.errorDescription} @${deviceName} ${bodyError}`);

      store.dispatch({
        type: EMIT_ROOM_MODULE_FAILURE,
        room,
        connectionStatus: false
      });
    });
  },

  handleIndirectMotion(payload) {
    const deviceId = payload.particleInfo.coreid;
    const room = find(devicesController.getRooms(), { deviceId });

    if (room) {
      store.dispatch({
        type: EMIT_ROOM_MOTION_UPDATE,
        room
      });
    } else {
      logUnhandledMotionUpdate(payload.particleInfo);
    }
  },

  /**
   * Handle an individual room's board accessories and reservations.
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
      accessories,
      connectionStatus: true
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

  boardFail: (room) => store.dispatch({
    type: EMIT_ROOM_MODULE_FAILURE,
    room,
    connectionStatus: false
  })
};

export default devicesController;
