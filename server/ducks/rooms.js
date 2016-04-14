/* eslint new-cap:0 */
import immutable from 'immutable';

import socketController from '../controllers/socket';
import slug from 'slug';

import { devices, coordinates } from '../environment';
import { flashNotifications,
         logRoomStatuses,
         filterExpiredReservations,
         getRoomAlert,
         secureRoom,
         secureRooms,
         handleAction } from '../utils';
import { INITIALIZE_ROOMS,
         ROOM_TEMPERATURE_UPDATE,
         ROOM_STATUSES_UPDATE } from '../constants';
import { EMIT_CLIENT_CONNECTED } from './clients';

export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_ROOM_PING_RECEIVED = 'EMIT_ROOM_PING_RECEIVED';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

const initialState = immutable.fromJS({
  rooms: devices.map((device) => {
    const id = device.name.toLowerCase();
    const location = slug(device.location, { lower: true });

    return Object.assign(device, { id, location, coordinates: coordinates[id] });
  })
});

const roomsReducer = (state = initialState, action) => {
  let alertChanged = false;

  const reducers = {
    [EMIT_CLIENT_CONNECTED]() {
      socketController.handle(INITIALIZE_ROOMS, secureRooms(state.toJS().rooms), action.client);

      return state;
    },

    [EMIT_ROOM_MOTION_UPDATE]() {
      const rooms = state.get('rooms');

      state = state.set('rooms', rooms.map((room) => {
        if (room.get('id') === action.room.id && action.motion) {
          room = room.set('motion', action.motion);
        }

        return room;
      }));

      reducers.EMIT_ROOM_STATUSES_UPDATE();

      return state;
    },

    [EMIT_ROOM_STATUSES_UPDATE]() {
      const rooms = state.get('rooms');

      state = state.set('rooms', rooms.map((room) => {
        if (room.get('id') === action.room.id) {
          const accessories = room.get('accessories') || action.accessories;
          const reservations = room.get('reservations') || action.reservations;
          const filteredReservations = filterExpiredReservations(reservations);
          const alert = getRoomAlert(filteredReservations, action.motion || room.get('motion'));

          if (room.get('alert') !== alert) {
            alertChanged = true;
            room = room.set('alert', alert);
          }

          if (action.type === EMIT_ROOM_STATUSES_UPDATE) {
            room = room.set('accessories', action.accessories);
            room = room.set('reservations', action.reservations);
          }

          if (accessories) {
            flashNotifications(room.toJS(), accessories);
          }
        }

        return room;
      }));

      if (alertChanged) {
        logRoomStatuses(state.toJS().rooms);
        socketController.handle(ROOM_STATUSES_UPDATE, secureRooms(state.toJS().rooms));
      }

      return state;
    },

    [EMIT_ROOM_TEMPERATURE_UPDATE]() {
      socketController.handle(ROOM_TEMPERATURE_UPDATE, secureRoom(action.room));

      return state;
    }
  };

  return handleAction(state, action, reducers);
};

export default roomsReducer;
