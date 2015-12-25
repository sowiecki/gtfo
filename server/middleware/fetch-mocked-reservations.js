import mockData from '../mocks/mock-data';
import setAlertByReservationStatus from './helpers/set-reservation-alert';
import { EMIT_ROOM_STATUSES_UPDATE } from '../ducks/rooms';
import * as urls from '../constants/urls';

const fetchRoomReservations = (next, action) => {
  const { room, accessories } = action;

  // TODO error handling so app doesn't crash when mockData[room.outlookAccount] === undefined
  const reservations = mockData[room.outlookAccount];
  const roomWithAlert = setAlertByReservationStatus(room, reservations);

  next({
    type: EMIT_ROOM_STATUSES_UPDATE,
    room: roomWithAlert,
    accessories
  });
};

export default fetchRoomReservations;
