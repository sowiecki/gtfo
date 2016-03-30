/* eslint no-case-declarations:0 */
import socketController from '../controllers/socket';

import { devices } from '../environment';
import { flashNotifications,
         logRoomStatuses,
         filterExpiredReservations,
         getRoomAlert } from '../utils';
import { INITIALIZE_ROOMS, ROOM_STATUSES_UPDATE } from '../constants';

export const EMIT_CLIENT_CONNECTED = 'EMIT_CLIENT_CONNECTED';
export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_ROOM_STATUSES_ERROR = 'EMIT_ROOM_STATUSES_ERROR';
export const EMIT_INIT_DEVICES = 'EMIT_INIT_DEVICES';
export const EMIT_ROOM_PING_RECEIVED = 'EMIT_ROOM_PING_RECEIVED';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

const roomsReducer = (state = devices, action) => {
  let alertChanged = false;
  const { accessories,
          temperature,
          lastMotion } = action;

  switch (action.type) {
    case EMIT_INIT_DEVICES:
      socketController.open(ROOM_STATUSES_UPDATE, state);

      break;
    case EMIT_CLIENT_CONNECTED:
      socketController.handle(INITIALIZE_ROOMS, state, action.client);

      break;
    case EMIT_ROOM_STATUSES_UPDATE:
      const filteredReservations = filterExpiredReservations(action.reservations);
      const alert = getRoomAlert(filteredReservations);

      /**
       * TODO
       * This is pretty gross, but necessary pending further major refactoring.
       * alertChanged is set and used to prevent spamming updates with duplicate data.
       */
      state = state.map((room) => {
        if (room.id === action.room.id) {
          const stateDiff = room.alert !== alert;

          if (stateDiff) {
            alertChanged = true;
          }

          room.alert = alert;
          flashNotifications(room, accessories);
        }
        return room;
      });

      if (alertChanged) {
        logRoomStatuses(state);
        socketController.handle(ROOM_STATUSES_UPDATE, state);
      }

      break;

    case EMIT_ROOM_STATUSES_ERROR:
      // TODO error handling
      break;
    case EMIT_ROOM_TEMPERATURE_UPDATE:
      state.temperature = temperature;

      break;
    case EMIT_ROOM_MOTION_UPDATE:
      state.lastMotion = lastMotion || false;

      break;
  }

  return [].concat(state);
};

export default roomsReducer;
