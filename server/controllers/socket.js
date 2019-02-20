import WebSocket from 'ws';
import moment from 'moment';
import { get, forEach } from 'lodash';

import { WEBSOCKET_PATH } from 'universal/config';
import store from '../store';
import consoleController from './console';
import devicesController from './devices';
import { config } from '../../environment';
import { send, getFutureAlerts, secureRooms, shouldOverrideMotion } from '../utils';
import { EMIT_CLIENT_CONNECTED, EMIT_FLUSH_CLIENT } from '../ducks/clients';
import {
  HANDSHAKE,
  INITIALIZE_ROOMS,
  INITIALIZE_MARKERS,
  INITIALIZE_STALLS,
  RECONNECTED,
  NEW_ROOM_PING,
  TIME_TRAVEL_UPDATE,
  FLUSH_SESSION,
  TIME_FORMAT
} from '../constants';

let wss;

/**
 * Host setup for web application WebSocket server.
 */
const socketController = {
  /**
   * Sets up and initializes socket connection with client.
   * @params{string} event Event constant for initial communication with client.
   * @returns {undefined}
   */
  initialize(server) {
    wss = new WebSocket.Server({ server, path: WEBSOCKET_PATH });

    wss.on('connection', (client) => {
      const overrides = {
        enableMotion: shouldOverrideMotion(devicesController.getRooms())
      };

      socketController.send(HANDSHAKE, { ...config, ...overrides }, client);

      const handleClientDisconnect = () => {
        store.dispatch({ type: EMIT_FLUSH_CLIENT, client });
      };

      client.on('message', (data) => {
        const message = JSON.parse(data);

        socketController.handle(message.event, message.payload, client);
      });

      client.on('close', handleClientDisconnect);
      client.on('error', handleClientDisconnect);
    });
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
    consoleController.log(`Received ${event} event`);

    const handlers = {
      [HANDSHAKE]() {
        // Register client socket with anchor and accessToke  parameters.
        const anchor = get(payload, 'anchor');
        const oauthResponse = get(payload, 'oauthResponse');

        store.dispatch({ type: EMIT_CLIENT_CONNECTED, client, anchor, oauthResponse });
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

      [FLUSH_SESSION]() {
        socketController.send(event, payload, client);
      },

      [RECONNECTED]() {
        // Reregister client socket with anchor parameter.
        const anchor = get(payload, 'anchor');
        const oauthResponse = get(payload, 'oauthResponse');

        store.dispatch({ type: EMIT_CLIENT_CONNECTED, client, anchor, oauthResponse });
      },

      [NEW_ROOM_PING]() {
        forEach(client, (clientWithAnchor) => {
          socketController.send(event, payload.ping, clientWithAnchor);
        });
      },

      [TIME_TRAVEL_UPDATE]() {
        const { rooms } = store.getState().roomsReducer.toJS();
        const newPayload = payload
          ? getFutureAlerts(secureRooms(rooms), moment(payload, TIME_FORMAT))
          : secureRooms(rooms);

        socketController.send(event, newPayload, client);
      },

      sendToAll() {
        forEach(client, (ws) => {
          socketController.send(event, payload, ws);
        });
      }
    };

    return handlers[event] ? handlers[event]() : handlers.sendToAll();
  },

  send
};

export default socketController;
