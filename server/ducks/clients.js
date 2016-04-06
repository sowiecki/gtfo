/* eslint default-case:0, no-case-declarations:0 */
import immutable from 'immutable';

import socketController from '../controllers/socket';

import { getOrigin } from '../utils';

export const EMIT_INIT_SOCKETS = 'EMIT_INIT_SOCKETS';
export const EMIT_CLIENT_CONNECTED = 'EMIT_CLIENT_CONNECTED';
export const EMIT_FLUSH_CLIENT = 'EMIT_FLUSH_CLIENT';

const initialState = immutable.fromJS({
  clients: {}
});

const clientsReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_INIT_SOCKETS]() {
      socketController.open();

      return state;
    },

    [EMIT_CLIENT_CONNECTED]() {
      const { client, anchor } = action;
      const clientWithAnchor = Object.assign(client, { anchor });

      return state.mergeIn(['clients'], { [getOrigin(client)]: clientWithAnchor });
    },

    [EMIT_FLUSH_CLIENT]() {
      const { client } = action;

      return state.deleteIn(['clients', getOrigin(client)]);
    }
  };

  return reducers[action.type] ? reducers[action.type]() : state;
};

export default clientsReducer;
