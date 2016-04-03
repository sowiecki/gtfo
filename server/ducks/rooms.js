/* eslint no-case-declarations:0, default-case:0, no-fallthrough:0 */
import socketController from '../controllers/socket';

import { devices } from '../environment';
import { flashNotifications,
         logRoomStatuses,
         filterExpiredReservations,
         getRoomAlert,
         secureRoom,
         secureRooms } from '../utils';
import { INITIALIZE_ROOMS,
         ROOM_TEMPERATURE_UPDATE,
         ROOM_STATUSES_UPDATE } from '../constants';

export const EMIT_CLIENT_CONNECTED = 'EMIT_CLIENT_CONNECTED';
export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_INIT_DEVICES = 'EMIT_INIT_DEVICES';
export const EMIT_ROOM_PING_RECEIVED = 'EMIT_ROOM_PING_RECEIVED';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

const initialState = {
  rooms: devices
};

const roomsReducer = (state = initialState, action) => {
  let alertChanged = false;

  switch (action.type) {
    case EMIT_INIT_DEVICES:
      socketController.open(ROOM_STATUSES_UPDATE, secureRooms(state.rooms));

      break;
    case EMIT_CLIENT_CONNECTED:
      socketController.handle(INITIALIZE_ROOMS, secureRooms(state.rooms), action.client);

      break;
    case EMIT_ROOM_MOTION_UPDATE:
      state.rooms.map((room) => {
        if (room.id === action.room.id) {
          room.motion = action.motion;
        }

        return room;
      });
      // No break, because alert needs to be redetermined
    case EMIT_ROOM_STATUSES_UPDATE:
      state.rooms = state.rooms.map((room) => {
        if (room.id === action.room.id) {
          // Get properties from state if available
          const accessories = room.accessories || action.accessories;
          const reservations = room.reservations || action.reservations;
          const filteredReservations = filterExpiredReservations(reservations);
          const alert = getRoomAlert(filteredReservations, room.motion);

          if (room.alert !== alert) {
            alertChanged = true;
          }

          room.alert = alert;

          if (action.type === EMIT_ROOM_STATUSES_UPDATE) {
            room.accessories = action.accessories;
            room.reservations = action.reservations;
          }

          flashNotifications(room, accessories);
        }
        return room;
      });

      if (alertChanged) {
        logRoomStatuses(state.rooms);
        socketController.handle(ROOM_STATUSES_UPDATE, secureRooms(state.rooms));
      }

      break;
    case EMIT_ROOM_TEMPERATURE_UPDATE:
      socketController.handle(ROOM_TEMPERATURE_UPDATE, secureRoom(action.room));

      break;
  }

  return state;
};

export default roomsReducer;
