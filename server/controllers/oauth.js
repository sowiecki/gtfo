import moment from 'moment';

import queryString from 'query-string';
import { config } from 'environment';
import consoleController from './console';
import { httpsRequest } from '../utils';

const oauthController = {
  initialize: async (req) => {
    try {
      const data = await oauthController.fetchAccessToken(req);
      const parsedData = JSON.parse(data);
      const accessToken = parsedData.access_token;
      const expiresOn = oauthController.getExpiresOn(parsedData);

      if (accessToken) {
        return { accessToken, expiresOn };
      } else {
        consoleController.log(data);
      }
    } catch (e) {
      consoleController.log(e);
    }
  },

  fetchAccessToken: async (originReq) => {
    const options = {
      hostname: 'login.microsoftonline.com',
      path: '/9ca75128-a244-4596-877b-f24828e476e2/oauth2/v2.0/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const requestBody = queryString.stringify({
      grant_type: 'authorization_code',
      client_id: config.oauth.clientId,
      code: originReq.query.code,
      redirect_uri: `${originReq.protocol}://${originReq.headers.host}`,
      client_secret: config.oauth.clientSecret
    });

    const { rawData } = await httpsRequest({ options, requestBody });

    return rawData;
  },

  getExpiresOn: (parsedData) =>
    moment()
      .utcOffset(config.public.timezone)
      .subtract(parsedData.expires_in, 's')
      .toISOString()
};

export default oauthController;
