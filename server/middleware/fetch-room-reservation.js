import http from 'http';

import { EMIT_ROOM_STATUSES_UPDATE } from '../ducks/rooms';
import * as urls from '../constants';
import { logFetchRoomReservationsError } from '../utils';

const fetchRoomReservations = (next, action) => {
  const { room, accessories } = action;
  const source = `${urls.RESERVATIONS_URL}${encodeURIComponent(room.id)}`;

  // Retrieve room reservation statuses from external service
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
  }).on('error', logFetchRoomReservationsError);
};

export default fetchRoomReservations;
