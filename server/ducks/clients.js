/* eslint default-case:0, no-case-declarations:0 */
import immutable from 'immutable';

import socketController from '../controllers/socket';

import { getWebSocketKey } from '../utils';

export const EMIT_INIT_SOCKETS = 'EMIT_INIT_SOCKETS';
export const EMIT_CLIENT_CONNECTED = 'EMIT_CLIENT_CONNECTED';
export const EMIT_FLUSH_CLIENT = 'EMIT_FLUSH_CLIENT';

const initialState = immutable.fromJS({
  clients: {}
});

const clientsReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_INIT_SOCKETS]() {
      const { event, publicConfig } = action;

      socketController.open(event, publicConfig);

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

  return reducers[action.type] ? reducers[action.type]() : state;
};

export default clientsReducer;
