/* globals window */
export const WEBSOCKET_PORT = '3001'; // TODO production mode
export const WEBSOCKET_PROTOCOL = 'protocolOne';
export const WEBSOCKET_RECONNECT_INTERVAL = 500;

export const getSocketPort = () => {
  const { hostname } = window.location;

  return `ws://${hostname}:${WEBSOCKET_PORT}`;
};
