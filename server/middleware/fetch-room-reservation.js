import http from 'http';

import { EMIT_RESERVATIONS_UPDATE } from '../ducks/rooms';
import { config } from '../../environment';
import { formatReservations, logFetchReservationsAPIError } from '../utils';

const fetchRoomReservation = (next) => {
  let body = '';
  const reservationsURL = `${config.reservations.host}${config.reservations.path}`;

  http.get(reservationsURL, (response) => {
    response.on('data', (data) => {
      body += data;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(body.toString('utf8'));
        const reservations = formatReservations(parsedData);

        next({
          type: EMIT_RESERVATIONS_UPDATE,
          reservations
        });
      } catch (e) {
        // Most likely cause of failure is error parsing response
        logFetchReservationsAPIError(e);
      }
    });
  });
};

export default fetchRoomReservation;
