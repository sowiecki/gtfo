/* globals window */
export const WEBSOCKET_PORT = 4001;
export const WEBSOCKET_PROTOCOL = 'protocolOne';
export const WEBSOCKET_RECONNECT_INTERVAL = 500;

export const getSocketPort = () => {
  const { hostname } = window.location;

  return `ws://${hostname}:${WEBSOCKET_PORT}`;
};
