/* globals window */
const WEBSOCKET_PORT = 4001;

export const getSocketPort = () => {
  const { hostname } = window.location;

  return `ws://${hostname}:${WEBSOCKET_PORT}`;
};
