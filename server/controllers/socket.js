/* eslint new-cap:0, no-console:0 */
/* globals console */
import WebSocket from 'ws';
import { filter, forEach } from 'lodash';

import store from '../store';

import { WEB_SOCKET_PORT } from '../config';
import { EMIT_CLIENT_CONNECTED, EMIT_FLUSH_CLIENT } from '../ducks/clients';
import { HANDSHAKE,
         INITIALIZE_ROOMS,
         INITIALIZE_MARKERS,
         INITIALIZE_STALLS,
         RECONNECTED,
         NEW_ROOM_PING } from '../constants';

const wss = new WebSocket.Server({ port: WEB_SOCKET_PORT });

const socketController = {
  getClients() {
    const { clients } = store.getState().clientsReducer.toJS();

    return clients;
  },

  /**
   * Sets up and initializes socket connection with client.
   * @params{string} event Event constant for initial communication with client.
   * @returns {undefined}
   */
  open(event, payload) {
    wss.on('connection', (client) => {
      socketController.send(event, payload, client); // Initialize with config

      client.on('message', (data) => {
        const message = JSON.parse(data);

        socketController.handle(message.event, message.payload, client);
      });

      client.on('close', () => {
        store.dispatch({ type: EMIT_FLUSH_CLIENT, client });
      });
    });
  },

  /**
   * Middleware function for all open socket communication.
   * Fails gracefully if communication with client fails unexpectedly.
   * @param {string} event Event constant that determines handling client-side.
   * @param {object} payload Payload to send to client.
   * @param {ws} client WebSocket object associated with specific targetted client.
   * @returns {undefined}
   */
  send(event, payload, client) {
    try {
      client.send(JSON.stringify({ event, payload }));
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * WebSocket protocol for governing all outgoing socket communications.
   * @param {string} event Event constant that determines handling server-side.
   *  Sometimes passed to client.
   * @param {object} payload Payload to send to client.
   * @param {ws | undefined} client WebSocket object associated with specific targetted client.
   * @returns {undefined}
   */
  handle(event, payload, client) {
    const handlers = {
      [HANDSHAKE]() { // Register client socket with anchor parameter.
        const { anchor } = payload;

        store.dispatch({ type: EMIT_CLIENT_CONNECTED, client, anchor });
      },

      [INITIALIZE_ROOMS]() {
        socketController.send(event, payload, client);
      },

      [INITIALIZE_MARKERS]() {
        socketController.send(event, payload, client);
      },

      [INITIALIZE_STALLS]() {
        socketController.send(event, payload, client);
      },

      [RECONNECTED]() { // Reregister client socket with anchor parameter.
        const { anchor } = payload;

        store.dispatch({ type: EMIT_CLIENT_CONNECTED, client, anchor });
      },

      [NEW_ROOM_PING]() { // Send ping to clients with matching anchor parameter.
        const clients = socketController.getClients();
        const clientsWithAnchor = filter(clients, { anchor: payload.anchor });

        forEach(clientsWithAnchor, (clientWithAnchor) => {
          socketController.send(event, payload, clientWithAnchor);
        });
      },

      sendToAll() {
        const clients = socketController.getClients();

        forEach(clients, (ws) => {
          socketController.send(event, payload, ws);
        });
      }
    };

    return handlers[event] ? handlers[event]() : handlers.sendToAll();
  }
};

export default socketController;
