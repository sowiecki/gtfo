/* globals WebSocket */
const host = 'ws://localhost:3001'; // TODO production mode
const protocol = 'protocolOne';

export default new WebSocket(host, protocol);
