import getMockData from '../mocks/mock-data';
import { EMIT_ROOM_STATUSES_UPDATE,
         EMIT_ROOM_STATUSES_ERROR } from '../ducks/rooms';
import { filterExpiredReservations, getRoomAlert } from '../utils';

const fetchMockedReservations = (next, action) => {
  const { room, accessories } = action;
  const mockData = getMockData();

  if (!mockData[room.id]) {
    next({ type: EMIT_ROOM_STATUSES_ERROR });
    return;
  }

  const reservations = filterExpiredReservations(mockData[room.id]);
  const alert = getRoomAlert(reservations);

  next({
    type: EMIT_ROOM_STATUSES_UPDATE,
    room,
    alert,
    accessories
  });
};

export default fetchMockedReservations;
