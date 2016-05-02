/* eslint no-console:0 */
/* globals console */
import http from 'http';

import { EMIT_STALL_OCCUPANCIES_UPDATE } from '../ducks/stalls';
import * as urls from '../constants';
import { formatStallsResponse,
         logFetchStallOccupanciesError } from '../utils';

const fetchRoomReservation = (next) => {
  // Retrieve stall occupancies from external service
  http.get(urls.STALLS_URL, (response) => {
    response.on('data', (data) => {
      try {
        const stalls = JSON.parse(data.toString('utf8'));

        next({
          type: EMIT_STALL_OCCUPANCIES_UPDATE,
          stalls: formatStallsResponse(stalls)
        });
      } catch (e) {
        // Most likely cause of failure is error parsing response
        console.log(logFetchStallOccupanciesError(e));
      }
    });
  }).on('error', logFetchStallOccupanciesError);
};

export default fetchRoomReservation;
