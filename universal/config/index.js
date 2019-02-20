const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

export const SERVER_PORT = normalizePort(process.env.PORT || '3000');
export const WEBSOCKET_PATH = '/ws';
