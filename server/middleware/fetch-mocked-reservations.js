import moment from 'moment';
import filter from 'lodash/collection/filter';

import mockData from '../mocks/mock-data';
import setAlertByReservationStatus from './utils/set-reservation-alert';
import { EMIT_ROOM_STATUSES_UPDATE } from '../ducks/rooms';

const fetchRoomReservations = (next, action) => {
  const { room, accessories } = action;
  // TODO error handling so app doesn't crash when mockData[room.outlookAccount] === undefined

  // filter to use ONLY current and upcoming reservations
  const reservations = filter(mockData[room.outlookAccount], (reservation) => {
    const reservationNotExpired = !moment(reservation.endDate).isBefore(moment());

    return reservationNotExpired;
  });

  const roomWithAlert = setAlertByReservationStatus(room, reservations);

  next({
    type: EMIT_ROOM_STATUSES_UPDATE,
    room: roomWithAlert,
    accessories
  });
};

export default fetchRoomReservations;
