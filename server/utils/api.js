import https from 'https';

export const genURL = ({ host, path }) => `${host}${path || ''}`;

export const httpsRequest = ({ options, requestBody }) =>
  new Promise((resolve, reject) => {
    const req = https.request(options, (response) => {
      response.setEncoding('utf8');

      let rawData = '';
      response.on('data', (chunk) => {
        rawData += chunk;
      });

      response.on('end', () => {
        resolve({ rawData, statusCode: response.statusCode });
      });
    });

    req.on('error', reject);

    req.end(requestBody);
  });
