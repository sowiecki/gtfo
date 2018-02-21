/* globals window */
import { WEBSOCKET_PORT } from './index';

export const getSocketPort = () => {
  const { hostname } = window.location;

  return `ws://${hostname}:${WEBSOCKET_PORT}`;
};
