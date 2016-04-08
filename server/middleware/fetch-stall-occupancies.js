import http from 'http';

import { EMIT_STALLS_OCCUPANCIES_UPDATE } from '../ducks/stalls';
import * as urls from '../constants';
import { logFetchStallOccupanciesError } from '../utils';

const fetchRoomReservations = (next) => {
  // Retrieve stall occupancies from external service
  http.get(urls.STALLS_URL, (response) => {
    response.on('data', (data) => {
      const stallOccupancies = JSON.parse(data.toString('utf8'));

      next({
        type: EMIT_STALLS_OCCUPANCIES_UPDATE,
        stallOccupancies
      });
    });
  }).on('error', logFetchStallOccupanciesError);
};

export default fetchRoomReservations;
