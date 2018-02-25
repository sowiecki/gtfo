import http from 'http';

import { EMIT_STALL_OCCUPANCIES_UPDATE } from '../ducks/stalls';
import { config } from '../../environment';
import { formatStallsResponse, logFetchStallAPIError, genURL } from '../utils';

const fetchStallOccupancies = (next) => {
  let body = '';

  http.get(genURL(config.stalls), (response) => {
    response.on('data', (data) => {
      body += data;
    });

    response.on('end', () => {
      try {
        const stalls = JSON.parse(body.toString('utf8'));

        next({
          type: EMIT_STALL_OCCUPANCIES_UPDATE,
          stalls: formatStallsResponse(stalls)
        });
      } catch (e) {
        // Most likely cause of failure is error parsing response
        logFetchStallAPIError(e);
      }
    });
  });
};

export default fetchStallOccupancies;
