import { readFileSync } from 'fs';

import socket from '../middleware/socket';
import mapNotifications from './utils/map-notifications';
import { ROOM_STATUSES_UPDATE } from '../constants/events';

const { devices } = JSON.parse(readFileSync('./environment/devices.json', 'utf8'));
const roomCoordinates = JSON.parse(readFileSync('./environment/room-coordinates.json', 'utf8'));

// Map room coordinates to device objects
devices.map((device) => device.coordinates = roomCoordinates[device.id]);

export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_ROOM_STATUSES_ERROR = 'EMIT_ROOM_STATUSES_ERROR';
export const INIT_ROOM_STATUSES = 'INIT_ROOM_STATUSES';
export const EMIT_ROOM_PING_RECEIVED = 'EMIT_ROOM_PING_RECEIVED';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

const roomsReducer = (state = devices, action) => {
  const { accessories,
          temperature,
          lastMotion } = action;

  switch (action.type) {
    case INIT_ROOM_STATUSES:
      socket.open(ROOM_STATUSES_UPDATE, state);

      break;
    case EMIT_ROOM_STATUSES_UPDATE:
      mapNotifications(action.room, accessories);
      socket.handle(ROOM_STATUSES_UPDATE, state);

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
