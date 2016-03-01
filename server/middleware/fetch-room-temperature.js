import { EMIT_ROOM_TEMPERATURE_UPDATE } from '../ducks/rooms';

const fetchRoomTemperature = (next, action) => {
  const { room, accessories } = action;
  const { thermo } = accessories;

  thermo.on('data', () => {
    next({
      type: EMIT_ROOM_TEMPERATURE_UPDATE,
      room,
      temperature: thermo.F
    });
  });
};

export default fetchRoomTemperature;
