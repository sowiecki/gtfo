import { EMIT_ROOM_TEMPERATURE_UPDATE } from '../ducks/rooms';

const fetchRoomTemperature = (room, next, action) => {
  const { thermo } = action.accessories;

  thermo.on('data', () => {
    next({
      type: EMIT_ROOM_TEMPERATURE_UPDATE,
      room,
      temperature: thermo.F
    });
  });
};

export default fetchRoomTemperature;
