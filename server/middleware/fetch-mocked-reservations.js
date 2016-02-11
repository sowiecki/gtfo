import getMockData from '../mocks/mock-data';
import { EMIT_ROOM_STATUSES_UPDATE,
         EMIT_ROOM_STATUSES_ERROR } from '../ducks/rooms';
import filterExpiredReservations from '../utils/filter-reservations';
import setAlertByReservationStatus from '../utils/set-reservation-alert';

const fetchMockedReservations = (next, action) => {
  const { room, accessories } = action;
  const mockData = getMockData();

  if (!mockData[room.id]) {
    next({ type: EMIT_ROOM_STATUSES_ERROR });
    return;
  }

  const reservations = filterExpiredReservations(mockData[room.id]);
  const roomWithAlert = setAlertByReservationStatus(room, reservations);

  next({
    type: EMIT_ROOM_STATUSES_UPDATE,
    room: roomWithAlert,
    accessories
  });
};

export default fetchMockedReservations;
