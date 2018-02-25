import http from 'http';

import { EMIT_STALL_OCCUPANCIES_UPDATE } from '../ducks/stalls';
import { config } from '../../environment';
import { formatStallsResponse, logFetchStallAPIError } from '../utils';

const fetchStallOccupancies = (next) => {
  if (!config.stalls) return;

  let body = '';
  const stallsURL = `${config.stalls.host}${config.stalls.path}`;

  http.get(stallsURL, (response) => {
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
