/* eslint no-console:0, max-nested-callbacks:0, array-callback-return:0 */
/* globals console, setInterval, clearInterval */

/**
 * Initializes each room module device
 */

import Particle from 'particle-api-js';
import { find } from 'lodash';
import colors from 'colors';

import consoleController from './console';
import store from '../store';
import { config } from '../environment';
import { shouldOverrideMotion, secureRooms, logUnhandledMotionUpdate } from '../utils';
import { EMIT_INIT_SOCKETS } from '../ducks/clients';
import {
  FETCH_ROOM_RESERVATIONS,
  EMIT_SET_ROOM_MODULE_STATUS,
  EMIT_ROOM_MODULE_FAILURE,
  EMIT_ROOM_MOTION_UPDATE,
  EMIT_ROOM_TEMPERATURE_UPDATE
} from '../ducks/rooms';
import {
  RESERVATIONS_CHECK_INTERVAL,
  UNDEFINED_EVENT,
  MOTION_DETECTED,
  TEMPERATURE_READINGS
} from '../constants';

const particle = new Particle();

const devicesController = {
  handleRoomEvent(payload) {
    const event = JSON.parse(payload.body.data);

    const ROOM_EVENT_HANDLERS_MAP = {
      [MOTION_DETECTED]() {
        devicesController.handleMotionUpdate(payload);
      },

      [TEMPERATURE_READINGS]() {
        devicesController.handleTemperatureReadingsUpdate(payload);
      },

      [UNDEFINED_EVENT]: () =>
        consoleController.log(`No event handler for event type ${event.type}`, event, 'red')
    };

    const eventType = ROOM_EVENT_HANDLERS_MAP[event.type] ? event.type : UNDEFINED_EVENT;

    return ROOM_EVENT_HANDLERS_MAP[eventType]();
  },

  getRooms: () => store.getState().roomsReducer.toJS().rooms,

  getSecureRooms: () => secureRooms(devicesController.getRooms()),

  getReservations: (req, res) => res.json(devicesController.getSecureRooms()),

  /**
   * Kicks off setting up and connecting to devices.
   * If devices are disabled, fetches reservations early without starting devices.
   * @returns {undefined}
   */
  initialize() {
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
  },

  updateRoomModule(room) {
    const deviceAuthToken = room.get('deviceAuthToken');

    if (!deviceAuthToken) return;

    particle
      .callFunction({
        deviceId: room.get('deviceId'),
        auth: deviceAuthToken,
        name: 'status',
        argument: room.get('alert')
      })
      .then(
        (data) => {
          const deviceName = colors.green.bold(room.get('name'));
          consoleController.log(`Successfully updated status of ${deviceName}`);

          store.dispatch({
            type: EMIT_SET_ROOM_MODULE_STATUS,
            room,
            connectionStatus: data.body.connected
          });
        },
        (err) => {
          const bodyError = colors.red.bold(err.body.error);
          const deviceName = colors.magenta.bold(room.get('name'));
          consoleController.log(`${err.errorDescription} @${deviceName} ${bodyError}`);

          store.dispatch({
            type: EMIT_ROOM_MODULE_FAILURE,
            room,
            connectionStatus: false
          });
        }
      );
  },

  handleMotionUpdate({ body }) {
    const room = find(devicesController.getRooms(), { deviceId: body.coreid });

    if (room) {
      store.dispatch({
        type: EMIT_ROOM_MOTION_UPDATE,
        room
      });
    } else {
      logUnhandledMotionUpdate(body.coreid);
    }
  },

  handleTemperatureReadingsUpdate({ body }) {
    const room = find(devicesController.getRooms(), { deviceId: body.coreid });
    const { readings } = JSON.parse(body.data);

    store.dispatch({
      type: EMIT_ROOM_TEMPERATURE_UPDATE,
      room,
      thermo: {
        f: readings.f,
        c: readings.c
      }
    });
  }
};

export default devicesController;
