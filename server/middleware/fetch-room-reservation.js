import http from 'http';

import { EMIT_RESERVATIONS_UPDATE } from '../ducks/rooms';
import * as urls from '../constants';
import { formatReservations, logfetchRoomReservationError } from '../utils';

const fetchRoomReservation = (next) => {
  const source = `${urls.RESERVATIONS_URL}`;
  let body = '';

  // Retrieve room reservation statuses from external service
  http.get(source, (response) => {
    response.on('data', (data) => {
      body += data;
    });

    response.on('end', () => {
      const parsedData = JSON.parse(body.toString('utf8'));
      const reservations = formatReservations(parsedData);

      next({
        type: EMIT_RESERVATIONS_UPDATE,
        reservations
      });
    });
  }).on('error', logfetchRoomReservationError);
};

export default fetchRoomReservation;
