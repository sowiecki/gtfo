import mockData from '../mocks/mock-data';
import setAlertByReservationStatus from './utils/set-reservation-alert';
import { EMIT_ROOM_STATUSES_UPDATE } from '../ducks/rooms';
import filterExpiredReservations from './utils/filter-reservations';

const fetchRoomReservations = (next, action) => {
  const { room, accessories } = action;
  // TODO error handling so app doesn't crash when mockData[room.outlookAccount] === undefined

  const reservations = filterExpiredReservations(mockData[room.outlookAccount]);

  const roomWithAlert = setAlertByReservationStatus(room, reservations);

  next({
    type: EMIT_ROOM_STATUSES_UPDATE,
    room: roomWithAlert,
    accessories
  });
};

export default fetchRoomReservations;
