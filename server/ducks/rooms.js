/* eslint new-cap:0 */
import immutable from 'immutable';
import slugify from 'slugify';

import devicesController from '../controllers/devices';
import socketController from '../controllers/socket';
import consoleController from '../controllers/console';

import { devices, coordinates } from '../environment';
import { flashNotifications,
         filterExpiredReservations,
         getRoomAlert,
         secureRoom,
         getSecureRooms,
         handleAction,
         initializeRoomModuleState } from '../utils';
import { INITIALIZE_ROOMS,
         ROOM_TEMPERATURE_UPDATE,
         ROOM_STATUSES_UPDATE,
         RUN_INDIRECT } from '../constants';
import { EMIT_CLIENT_CONNECTED } from './clients';

export const EMIT_DEVICE_STATUS_UPDATE = 'EMIT_DEVICE_STATUS_UPDATE';
export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
export const FETCH_ROOM_RESERVATIONS = 'FETCH_ROOM_RESERVATIONS';
export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_SET_ROOM_ACCESSORIES = 'EMIT_SET_ROOM_ACCESSORIES';
export const EMIT_ROOM_MODULE_FAILURE = 'EMIT_ROOM_MODULE_FAILURE';
export const EMIT_RESERVATIONS_UPDATE = 'EMIT_RESERVATIONS_UPDATE';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_ROOM_PING_RECEIVED = 'EMIT_ROOM_PING_RECEIVED';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

const initialState = immutable.fromJS({
  rooms: devices.map((device) => {
    const id = device.name.toLowerCase();
    const location = slugify(device.location).toLowerCase();

    return { ...device, id, location, coordinates: coordinates[id], connectionStatus: false };
  })
});

const roomsReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_CLIENT_CONNECTED]() {
      socketController.handle(INITIALIZE_ROOMS, getSecureRooms(state), action.client);

      return state;
    },

    [EMIT_SET_ROOM_ACCESSORIES]() {
      const rooms = state.get('rooms');

      state = state.set('rooms', rooms.map(initializeRoomModuleState.bind(null, action)));

      consoleController.logRoomStatuses(getSecureRooms(state));
      return reducers.EMIT_ROOM_STATUSES_UPDATE();
    },

    [EMIT_ROOM_MODULE_FAILURE]() {
      const rooms = state.get('rooms');

      state = state.set('rooms', rooms.map(initializeRoomModuleState.bind(null, action)));

      consoleController.logRoomStatuses(getSecureRooms(state));
      return reducers.EMIT_ROOM_STATUSES_UPDATE();
    },

    [EMIT_RESERVATIONS_UPDATE]() {
      const rooms = state.get('rooms');

      state = state.set('rooms', rooms.map(
        (room) => room.set('reservations', action.reservations[room.get('name')])
      ));

      return reducers.EMIT_ROOM_STATUSES_UPDATE();
    },

    [EMIT_ROOM_MOTION_UPDATE]() {
      const rooms = state.get('rooms');

      state = state.set('rooms', rooms.map((room) => {
        const motionDetectedInRoom = room.get('id') === action.room.id && action.motion;

        if (motionDetectedInRoom) {
          room = room.set('motion', action.motion);
        }

        return room;
      }));

      return reducers.EMIT_ROOM_STATUSES_UPDATE();
    },

    [EMIT_ROOM_STATUSES_UPDATE]() {
      const rooms = state.get('rooms');
      let alertChanged = false;

      state = state.set('rooms', rooms.map((room) => {
        const accessories = room.get('accessories');
        const reservations = room.get('reservations');
        const motion = action.motion || room.get('motion');
        const filteredReservations = filterExpiredReservations(reservations);
        const alert = getRoomAlert(filteredReservations, motion);

        if (room.get('alert') !== alert) {
          alertChanged = true;
          room = room.set('alert', alert);
        }

        if (accessories) {
          flashNotifications(room.toJS(), accessories);
        }

        return room;
      }));

      if (alertChanged) {
        const devicesEnabled = !process.env.DISABLE_DEVICES;
        const runningIndirect = process.env.RUN_MODE === RUN_INDIRECT;

        if (devicesEnabled && runningIndirect) {
          devicesController.updateIndirect(state.get('rooms'));
        }

        consoleController.logRoomStatuses(getSecureRooms(state));
        socketController.handle(ROOM_STATUSES_UPDATE, getSecureRooms(state));
      }

      return state;
    },

    [EMIT_ROOM_TEMPERATURE_UPDATE]() {
      const rooms = state.get('rooms');

      state = state.set('rooms', rooms.map((room) => {
        if (room.get('id') === action.room.id) {
          room = room.set('thermo', action.thermo);

          socketController.handle(ROOM_TEMPERATURE_UPDATE, secureRoom(room.toJS()));
        }

        return room;
      }));

      return state;
    }
  };

  return handleAction(state, action, reducers);
};

export default roomsReducer;
