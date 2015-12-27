import fs from 'fs';

import notificationsController from '../controllers/notifications';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';

const reducer = (state = devices, action) => {
  const { room } = action;

  switch (action.type) {
    case EMIT_ROOM_STATUSES_UPDATE:
      const { accessories } = action;

      notificationsController(room, accessories);

      return room;

    case EMIT_ROOM_TEMPERATURE_UPDATE:
      const { temperature } = action;

      room.temperature = temperature;
      return room;

    case EMIT_ROOM_MOTION_UPDATE:
      const { lastMotion } = action;

      room.lastMotion = lastMotion || false;
      return room;

    default:
      return state;
  }
};

export default reducer;
