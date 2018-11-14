/* eslint new-cap:0 */
import immutable from 'immutable';
import slugify from 'slugify';
import moment from 'moment';
import { get } from 'lodash';

import devicesController from '../controllers/devices';
import socketController from '../controllers/socket';
import consoleController from '../controllers/console';

import { devices, coordinates, config } from '../../environment';
import {
  filterExpiredReservations,
  getRoomAlert,
  secureRoom,
  getSecureRooms,
  handleAction,
  initializeRoomModuleState
} from '../utils';
import { INITIALIZE_ROOMS, ROOM_TEMPERATURE_UPDATE, ROOM_STATUSES_UPDATE } from '../constants';
import { EMIT_CLIENT_CONNECTED } from './clients';

export const EMIT_DEVICE_STATUS_UPDATE = 'EMIT_DEVICE_STATUS_UPDATE';
export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
export const FETCH_ROOM_RESERVATIONS = 'FETCH_ROOM_RESERVATIONS';
export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_SET_ROOM_MODULE_STATUS = 'EMIT_SET_ROOM_MODULE_STATUS';
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
    const capabilities = {
      motion: get(device, 'capabilities.motion', false)
    };

    return {
      ...device,
      id,
      location,
      capabilities,
      coordinates: coordinates[id],
      connectionStatus: false
    };
  })
});

const roomsReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_CLIENT_CONNECTED]() {
      socketController.handle(INITIALIZE_ROOMS, getSecureRooms(state), action.client);

      return state;
    },

    [EMIT_SET_ROOM_MODULE_STATUS]() {
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

      state = state.set(
        'rooms',
        rooms.map((room) => {
          const reservations = action.reservations[room.get('name')];
          const currentReservation = reservations.find((reservation) =>
            moment()
              .utcOffset(config.public.timezone)
              .isBetween(moment(reservation.startDate), moment(reservation.endDate)));

          return room
            .set('currentReservation', currentReservation)
            .set('reservations', reservations);
        })
      );

      return reducers.EMIT_ROOM_STATUSES_UPDATE();
    },

    [EMIT_ROOM_MOTION_UPDATE]() {
      const rooms = state.get('rooms');

      state = state.set(
        'rooms',
        rooms.map((room) => {
          const motionDetectedInRoom = room.get('id') === action.room.id;

          if (motionDetectedInRoom) {
            room = room.set('recentMotion', moment());
          }

          return room;
        })
      );

      return reducers.EMIT_ROOM_STATUSES_UPDATE();
    },

    [EMIT_ROOM_STATUSES_UPDATE]() {
      const rooms = state.get('rooms');
      let alertHasChanged;
      let anyAlertChanged;

      state = state.set(
        'rooms',
        rooms.map((room) => {
          const { reservations, capabilities, recentMotion } = room.toJS();
          const roomProperties = {
            reservations: filterExpiredReservations(reservations),
            recentMotion: action.recentMotion || recentMotion
          };
          const alert = getRoomAlert(roomProperties, capabilities);
          alertHasChanged = room.get('alert') !== alert;

          if (alertHasChanged) {
            anyAlertChanged = true;
            room = room.set('alert', alert);

            devicesController.updateRoomModule(room);
          }

          return room;
        })
      );

      if (anyAlertChanged) {
        consoleController.logRoomStatuses(getSecureRooms(state));
        socketController.handle(ROOM_STATUSES_UPDATE, getSecureRooms(state));
      }

      return state;
    },

    [EMIT_ROOM_TEMPERATURE_UPDATE]() {
      const rooms = state.get('rooms');

      state = state.set(
        'rooms',
        rooms.map((room) => {
          if (room.get('id') === action.room.id) {
            room = room.set('thermo', action.thermo);

            socketController.handle(ROOM_TEMPERATURE_UPDATE, secureRoom(room.toJS()));
          }

          return room;
        })
      );

      return state;
    }
  };

  return handleAction(state, action, reducers);
};

export default roomsReducer;
