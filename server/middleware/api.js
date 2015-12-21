/* eslint no-console:0, callback-return:0 */
import http from 'http';

import mockRoomData from '../mocks/mock-data';
import setAlertByReservationStatus from './helpers/set-reservation-alert';
import {
  MOCK_ROOM_RESERVATIONS,
  FETCH_ROOM_RESERVATIONS,
  FETCH_ROOM_TEMPERATURE,
  EMIT_ROOM_STATUSES_UPDATE,
  EMIT_ROOM_TEMPERATURE_UPDATE
} from '../ducks/rooms';

const fetchRoomReservations = (next, action) => {
  const { room, accessories } = action;
  const source = `${FETCH_ROOM_RESERVATIONS}${room.outlookAccount}`;

  // Retrieve outlook room reservation statuses
  http.get(source, (response) => {
    response.on('data', (data) => {
      const reservations = JSON.parse(data.toString('utf8'));
      const roomWithAlert = setAlertByReservationStatus(room, reservations);

      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        room: roomWithAlert,
        accessories
      });
    });
  }).on('error', (error) => {
    const errorMessage = `Failed to fetch room reservations
                          for ${room.outlookAccount}. \n
                          ${error}`;

    console.log(errorMessage);
  });
};

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

export default () => (next) => (action) => {
  const { room, accessories } = action;

  switch (action.type) {
    case MOCK_ROOM_RESERVATIONS:
      const reservations = mockRoomData[room.outlookAccount];
      const roomWithAlert = setAlertByReservationStatus(room, reservations);

      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        room: roomWithAlert,
        accessories
      });
      break;

    case FETCH_ROOM_RESERVATIONS:
      fetchRoomReservations(next, action);
      break;

    case FETCH_ROOM_TEMPERATURE:
      fetchRoomTemperature(room, next, action);
      break;

    default:
      next(action);
      break;
  }
};
