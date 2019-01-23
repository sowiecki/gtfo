import queryString from 'query-string';

import { EMIT_FLUSH_CLIENT } from '../ducks/clients';
import { config } from '../../environment';
import { httpsRequest } from '../utils';

const validateOauthToken = async (next, action) => {
  const requestBody = queryString.stringify({
    client_id: config.oauth.clientId,
    client_secret: config.oauth.clientSecret
  });

  const options = {
    hostname: 'graph.microsoft.com',
    path: '/v1.0/organization',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${action.oauthResponse.accessToken}`
    }
  };

  try {
    const { rawData, statusCode } = await httpsRequest({ options, requestBody });
    const organizationIds = JSON.parse(rawData).value.map(({ id }) => id);

    if (statusCode === 200 && organizationIds.includes(config.oauth.organizationId)) {
      next(action);
    } else {
      next({ type: EMIT_FLUSH_CLIENT, client: action.client });
    }
  } catch (e) {
    console.error('ERROR', e);
  }
};

export default validateOauthToken;
