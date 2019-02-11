import moment from 'moment';
import colors from 'colors/safe';

import queryString from 'query-string';
import { config } from 'environment';
import consoleController from './console';
import { httpsRequest } from '../utils';

const oauthController = {
  initialize: async (req) => {
    try {
      const data = await oauthController.fetchAccessTokenFromCode({
        code: req.query.code,
        redirectUri: `${req.protocol}://${req.headers.host}`
      });
      const accessToken = data.access_token;
      const expiresOn = oauthController.getExpiresOn(data);

      if (accessToken) {
        return { accessToken, expiresOn };
      } else {
        consoleController.log(data.error_description);
      }
    } catch (e) {
      consoleController.log(e);
    }
  },

  fetchAccessTokenFromCode: async ({ code, redirectUri }) => {
    const options = {
      method: 'POST',
      hostname: 'login.microsoftonline.com',
      path: `/${config.oauth.organizationId}/oauth2/v2.0/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const requestBody = queryString.stringify({
      grant_type: 'authorization_code',
      client_id: config.oauth.clientId,
      client_secret: config.oauth.clientSecret,
      redirect_uri: redirectUri,
      code
    });

    try {
      const { rawData } = await httpsRequest({ options, requestBody });

      return JSON.parse(rawData);
    } catch (e) {
      consoleController.log(colors.red(e));
    }
  },

  fetchAccessTokenFromRefreshToken: async () => {
    const requestBody = queryString.stringify({
      grant_type: 'refresh_token',
      client_id: config.oauth.clientId,
      client_secret: config.oauth.clientSecret,
      refresh_token: config.oauth.refreshToken,
      resource: 'https://graph.microsoft.com'
    });
    const options = {
      method: 'POST',
      hostname: 'login.windows.net',
      path: '/common/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    try {
      const { rawData } = await httpsRequest({ options, requestBody });

      return JSON.parse(rawData);
    } catch (e) {
      consoleController.log(colors.red(e));
    }
  },

  getExpiresOn: (parsedData) =>
    moment()
      .utcOffset(config.public.timezone)
      .subtract(parsedData.expires_in, 's')
      .toISOString()
};

export default oauthController;
