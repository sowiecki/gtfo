/* API URI */
export const apiURI = '/api/';

/* Ports */
const normalizePort = (val) => {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

export const serverPort = normalizePort(process.env.PORT || '3000');
export const clientPort = process.env.HOT || process.env.NODE_ENV ? serverPort : 8080;

/* Server public path */
export const publicPath = './public/';
