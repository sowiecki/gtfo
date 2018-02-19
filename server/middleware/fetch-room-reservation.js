import http from 'http';

import { EMIT_RESERVATIONS_UPDATE } from '../ducks/rooms';
import { RESERVATIONS_URL } from '../constants';
import { formatReservations, logfetchRoomReservationError } from '../utils';

const fetchRoomReservation = (next) => {
  let body = '';

  http
    .get(RESERVATIONS_URL, (response) => {
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
    })
    .on('error', logfetchRoomReservationError);
};

export default fetchRoomReservation;
