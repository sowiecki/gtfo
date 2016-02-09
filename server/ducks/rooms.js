import { readFileSync } from 'fs';

import socket from '../socket';
import mapNotifications from './utils/map-notifications';
import { ROOMS_UPDATE } from '../constants/values';

const { devices } = JSON.parse(readFileSync('./data/devices.json', 'utf8'));
const roomCoordinates = JSON.parse(readFileSync('./data/room-coordinates.json', 'utf8'));

// Map room coordinates to device object
devices.map((device) => device.coordinates = roomCoordinates[device.id]);

export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_ROOM_STATUSES_ERROR = 'EMIT_ROOM_STATUSES_ERROR';
export const EMIT_ROOM_PING_UPDATE = 'EMIT_ROOM_PING_UPDATE';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

const roomsReducer = (state = devices, action) => {
  const { accessories,
          temperature,
          lastMotion } = action;

  switch (action.type) {
    case EMIT_ROOM_STATUSES_UPDATE:
      mapNotifications(action.room, accessories);
      socket.send(ROOMS_UPDATE, state);

      break;

    case EMIT_ROOM_PING_UPDATE:
/*
  TODO
  - Set ping specific to client, probably move to API and send over socket
  - Reset pings after x amount of time
*/

      state.map((room) => {
        if (room.id === action.room.id) {
          room.pinged = true;
        }
        return room;
      });

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

  return state;
};

export default roomsReducer;
