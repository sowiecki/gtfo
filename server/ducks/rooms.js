/* eslint new-cap:0 */
import immutable from 'immutable';
import slug from 'slug';

import socketController from '../controllers/socket';
import consoleController from '../controllers/console';

import { devices, coordinates } from '../environment';
import { flashNotifications,
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
export const FETCH_ROOM_RESERVATIONS = 'FETCH_ROOM_RESERVATIONS';
export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_RESERVATIONS_UPDATE = 'EMIT_RESERVATIONS_UPDATE';
export const EMIT_ROOM_PING_RECEIVED = 'EMIT_ROOM_PING_RECEIVED';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

const initialState = immutable.fromJS({
  rooms: devices.map((device) => {
    const id = device.name.toLowerCase();
    const location = slug(device.location, { lower: true });

    return { ...device, id, location, coordinates: coordinates[id] };
  })
});

const getSecureRooms = (state) => secureRooms(state.toJS().rooms);

const roomsReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_CLIENT_CONNECTED]() {
      socketController.handle(INITIALIZE_ROOMS, getSecureRooms(state), action.client);

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

      /**
       * This reducer is unique in that returns another invoked reducer,
       * which is necessary to update room statuses after detecting motion.
       */
      return reducers.EMIT_RESERVATIONS_UPDATE();
    },

    [EMIT_RESERVATIONS_UPDATE]() {
      const rooms = state.get('rooms');
      let alertChanged = false;

      state = state.set('rooms', rooms.map((room) => {
        const id = room.get('id');

        if (id === room.id) {
          const accessories = room.get('accessories');
          const reservations = action.reservations[id] || room.get('reservations');
          const filteredReservations = filterExpiredReservations(reservations);
          const alert = getRoomAlert(filteredReservations, action.motion || room.get('motion'));

          if (room.get('alert') !== alert) {
            alertChanged = true;
            room = room.set('alert', alert);
          }

          if (action.type === EMIT_RESERVATIONS_UPDATE) {
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
        consoleController.logRoomStatuses(getSecureRooms(state));
        // TODO Figure out why above line doesn't work without line below.
        consoleController.log('Room statuses updated');
        socketController.handle(ROOM_STATUSES_UPDATE, getSecureRooms(state));
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
