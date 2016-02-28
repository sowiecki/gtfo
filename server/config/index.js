/* eslint no-console:0 */
/* globals console */
import colors from 'colors/safe';
import { argv } from 'yargs';

if (argv.mocks) {
  process.env.MOCKS = true;
  console.log(colors.gray.italic('Using mock data'));
}

if (argv.dd) {
  process.env.DISABLE_DEVICES = true;
}

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
export const SERVER_PORT = normalizePort(process.env.PORT || '3000');
export const WEB_SOCKET_PORT = 4001;

/* Server public path */
export const PUBLIC_PATH = 'public';
