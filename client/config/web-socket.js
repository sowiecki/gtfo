/* globals window */
import { SERVER_PORT, WEBSOCKET_PATH } from './index';

export const getSocketPort = () => {
  const { hostname, protocol } = window.location;
  const webSocketProtocol = protocol === 'https:' ? 'wss' : 'ws';

  return `${webSocketProtocol}://${hostname}:${SERVER_PORT}${WEBSOCKET_PATH}`;
};
