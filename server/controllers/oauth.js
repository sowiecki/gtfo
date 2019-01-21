import https from 'https';

import queryString from 'query-string';

import { config } from 'environment';

const oauthController = {
  initialize: async ({ req, callback }) => {
    try {
      const data = await oauthController.fetchRefreshToken(req);
      const accessToken = JSON.parse(data).access_token;

      if (accessToken) {
        console.log('accessToken', accessToken);
      } else {
        console.log(data);
      }

      // TODO literally everything else
      // callback();
    } catch (e) {
      console.log(e);
    }
  },

  fetchRefreshToken: async (originReq) => {
    const requestBody = queryString.stringify({
      grant_type: 'authorization_code',
      client_id: config.oauth.clientId,
      code: originReq.query.code,
      redirect_uri: `${originReq.protocol}://${originReq.headers.host}/authorize`,
      client_secret: config.oauth.clientSecret
    });

    const options = {
      hostname: 'login.microsoftonline.com',
      path: '/9ca75128-a244-4596-877b-f24828e476e2/oauth2/v2.0/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        response.setEncoding('utf8');
        let rawData = '';
        response.on('data', (chunk) => {
          rawData += chunk;
        });
        response.on('end', () => resolve(rawData));
      });

      request.on('error', reject);

      request.end(requestBody);
    });
  }
};

export default oauthController;
