/* eslint no-console:0 */
/* globals console */

import http from 'http';

import setAlertByReservationStatus from './utils/set-reservation-alert';
import { EMIT_ROOM_STATUSES_UPDATE } from '../ducks/rooms';
import * as urls from '../constants/urls';
import filterExpiredReservations from './utils/filter-reservations';

const fetchRoomReservations = (next, action) => {
  const { room, accessories } = action;
  const source = `${urls.ROOM_RESERVATIONS}${encodeURIComponent(room.id)}`;

  // Retrieve outlook room reservation statuses
  http.get(source, (response) => {
    response.on('data', (data) => {
      const reservationsResponse = JSON.parse(data.toString('utf8'));
      const reservations = filterExpiredReservations(reservationsResponse);

      const roomWithAlert = setAlertByReservationStatus(room, reservations);

      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        room: roomWithAlert,
        accessories
      });
    });
  }).on('error', (error) => {
    const errorMessage = `Failed to fetch room reservations
                          for ${room.id}. \n ${error}`;

    console.error(errorMessage);
  });
};

export default fetchRoomReservations;
