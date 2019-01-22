import queryString from 'query-string';

import { config } from '../../environment';
import { httpsRequest } from '../utils';

const validateOauthToken = async (next, action) => {
  const requestBody = queryString.stringify({
    client_id: config.oauth.clientId,
    client_secret: config.oauth.clientSecret
  });

  const options = {
    hostname: 'graph.microsoft.com',
    path: '/v1.0/me',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${action.oauthResponse.accessToken}`
    }
  };

  try {
    const { statusCode } = await httpsRequest({ options, requestBody });

    if (statusCode === 200) {
      next(action);
    } else {
      // TODO handle auth failure
      // next({ ...action, });
    }
  } catch (e) {
    console.error('ERROR', e);
  }
};

export default validateOauthToken;
