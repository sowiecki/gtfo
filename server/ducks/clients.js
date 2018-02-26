import immutable from 'immutable';

import socketController from '../controllers/socket';

import { HANDSHAKE } from '../constants';
import { getWebSocketKey, handleAction } from '../utils';

export const EMIT_INIT_SOCKETS = 'EMIT_INIT_SOCKETS';
export const EMIT_CLIENT_CONNECTED = 'EMIT_CLIENT_CONNECTED';
export const EMIT_FLUSH_CLIENT = 'EMIT_FLUSH_CLIENT';

const initialState = immutable.fromJS({
  clients: {}
});

const clientsReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_INIT_SOCKETS]() {
      const { config, overrides } = action;
      const configWithOverrides = { ...config.public, ...overrides };

      socketController.open(HANDSHAKE, configWithOverrides);

      return state;
    },

    [EMIT_CLIENT_CONNECTED]() {
      const { client, anchor } = action;
      const clientWithAnchor = Object.assign(client, { anchor });

      return state.mergeIn(['clients'], { [getWebSocketKey(client)]: clientWithAnchor });
    },

    [EMIT_FLUSH_CLIENT]() {
      const { client } = action;

      return state.deleteIn(['clients', getWebSocketKey(client)]);
    }
  };

  return handleAction(state, action, reducers);
};

export default clientsReducer;
