/* eslint no-console:0 */
/* globals console */

import http from 'http';

import setAlertByReservationStatus from './utils/set-reservation-alert';
import { EMIT_ROOM_STATUSES_UPDATE } from '../ducks/rooms';
import * as urls from '../constants/urls';

const fetchRoomReservations = (next, action) => {
  const { room, accessories } = action;
  const source = `${urls.ROOM_RESERVATIONS}${room.outlookAccount}`;

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

export default fetchRoomReservations;
