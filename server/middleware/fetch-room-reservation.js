import http from 'http';

import { EMIT_RESERVATIONS_UPDATE } from '../ducks/rooms';
import * as urls from '../constants';
import { logfetchRoomReservationError } from '../utils';

const fetchRoomReservation = (next) => {
  const source = `${urls.RESERVATIONS_URL}`;

  // Retrieve room reservation statuses from external service
  http.get(source, (response) => {
    response.on('data', (data) => {
      const reservations = JSON.parse(data.toString('utf8'));

      next({
        type: EMIT_RESERVATIONS_UPDATE,
        reservations
      });
    });
  }).on('error', logfetchRoomReservationError);
};

export default fetchRoomReservation;
