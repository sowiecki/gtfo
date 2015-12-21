import fs from 'fs';

import accessoriesController from '../controllers/accessories';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';

const reducer = (state = devices, action) => {
  const { room } = action;

  switch (action.type) {
    case EMIT_ROOM_STATUSES_UPDATE:
      const { accessories } = action;

      accessoriesController(room, accessories);

      return room;

    case EMIT_ROOM_TEMPERATURE_UPDATE:
      const { temperature } = action;

      room.temperature = temperature;
      return room;

    default:
      return state;
  }
};

export default reducer;
