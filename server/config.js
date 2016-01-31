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

/* Ports */
export const serverPort = normalizePort(process.env.PORT || '3000');

/* Server public path */
export const publicPath = 'public';
