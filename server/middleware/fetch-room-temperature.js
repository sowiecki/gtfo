import { EMIT_ROOM_TEMPERATURE_UPDATE } from '../ducks/rooms';

const fetchRoomTemperature = (next, action) => {
  const { room, accessories } = action;
  const { thermo } = accessories;

  thermo.on('data', () => {
    room.tmpVoltage = thermo.F;

    next({
      type: EMIT_ROOM_TEMPERATURE_UPDATE,
      room
    });
  });
};

export default fetchRoomTemperature;
