import { readFileSync } from 'fs';

import socket from '../socket';
import mapNotifications from './utils/map-notifications';
import { ROOMS_UPDATE } from '../constants/values';

const { devices } = JSON.parse(readFileSync('./data/devices.json', 'utf8'));
const roomCoordinates = JSON.parse(readFileSync('./data/room-coordinates.json', 'utf8'));

// Map room coordinates to device object
devices.map((device) => device.coordinates = roomCoordinates[device.id]);

export const SEND_ROOMS_UPDATE = 'SEND_ROOMS_UPDATE';

export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
// export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
// export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_ROOM_STATUSES_ERROR = 'EMIT_ROOM_STATUSES_ERROR';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

const reducer = (state = devices, action) => {
  const { room,
          accessories,
          temperature,
          lastMotion } = action;

  switch (action.type) {
    case EMIT_ROOM_STATUSES_UPDATE:
      mapNotifications(room, accessories);

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
    case SEND_ROOMS_UPDATE:
      socket.send(ROOMS_UPDATE, state);

      break;
  }

  return state;
};

export default reducer;
