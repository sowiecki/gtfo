import http from 'http';

import { EMIT_RESERVATIONS_UPDATE } from '../ducks/rooms';
import { FETCH_ROOM_RESERVATIONS_ERROR_MESSAGE, RESERVATIONS_URL } from '../constants';
import consoleController from '../controllers/console';
import { formatReservations, logfetchRoomReservationError } from '../utils';

const fetchRoomReservation = (next) => {
  let body = '';

  // Retrieve room reservation statuses from external service
  http.get(RESERVATIONS_URL, (response) => {
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
      } catch (error) {
        consoleController.log(FETCH_ROOM_RESERVATIONS_ERROR_MESSAGE, error, 'bgRed');
      }
    });
  }).on('error', logfetchRoomReservationError);
};

export default fetchRoomReservation;
