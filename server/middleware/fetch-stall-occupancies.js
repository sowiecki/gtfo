import http from 'http';

import { EMIT_STALL_OCCUPANCIES_UPDATE } from '../ducks/stalls';
import * as urls from '../constants';
import { logFetchStallOccupanciesError } from '../utils';

const fetchRoomReservations = (next) => {
  // Retrieve stall occupancies from external service
  http.get(urls.STALLS_URL, (response) => {
    response.on('data', (data) => {
      const stalls = JSON.parse(data.toString('utf8'));

      next({
        type: EMIT_STALL_OCCUPANCIES_UPDATE,
        stalls
      });
    });
  }).on('error', logFetchStallOccupanciesError);
};

export default fetchRoomReservations;
