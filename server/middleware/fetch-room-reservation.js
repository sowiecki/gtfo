/* eslint no-console:0 */
/* globals console */
import http from 'http';

import { EMIT_ROOM_STATUSES_UPDATE } from '../ducks/rooms';
import * as urls from '../constants';

const fetchRoomReservations = (next, action) => {
  const { room, accessories } = action;
  const source = `${urls.RESERVATIONS_URL}${encodeURIComponent(room.id)}`;

  // Retrieve room reservation statuses from Exchange wrapper
  http.get(source, (response) => {
    response.on('data', (data) => {
      const reservations = JSON.parse(data.toString('utf8'));

      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        room,
        reservations,
        accessories
      });
    });
  }).on('error', ({ code }) => {
    const errorMessage = `Failed to fetch room reservations for ${room.id}.`;

    console.error(errorMessage, code);
  });
};

export default fetchRoomReservations;
