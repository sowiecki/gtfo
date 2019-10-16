import queryString from 'query-string';
import colors from 'colors/safe';

import { FLUSH_SESSION } from '../constants';
import { EMIT_FLUSH_CLIENT } from '../ducks/clients';
import { config } from '../../environment';
import consoleController from '../controllers/console';
import socketController from '../controllers/socket';
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

  const handleError = () => {
    next({ type: EMIT_FLUSH_CLIENT, client: action.client });
    socketController.handle(FLUSH_SESSION, {}, action.client);
  };

  try {
    const { rawData, statusCode } = await httpsRequest({ options, requestBody });
    const organizationIds = JSON.parse(rawData).value.map(({ id }) => id);

    if (statusCode === 200 && organizationIds.includes(config.oauth.organizationId)) {
      next(action);
    } else {
      handleError();
    }
  } catch (e) {
    consoleController.log(colors.red(e));
    handleError();
  }
};

export default validateOauthToken;
