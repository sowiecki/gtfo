import immutable from 'immutable';
import { uniqueId } from 'lodash';

import { handleAction } from '../utils';

export const EMIT_CLIENT_OAUTH_UPDATE = 'EMIT_CLIENT_OAUTH_UPDATE';
export const EMIT_CLIENT_CONNECTED = 'EMIT_CLIENT_CONNECTED';
export const EMIT_FLUSH_CLIENT = 'EMIT_FLUSH_CLIENT';

const initialState = immutable.fromJS({
  clients: {}
});

const clientsReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_CLIENT_CONNECTED]() {
      const { client, anchor, oauthResponse } = action;
      const clientId = uniqueId('client_');
      const clientWithParams = Object.assign(client, { anchor, clientId, oauthResponse });

      return state.mergeIn(['clients'], { [clientId]: clientWithParams });
    },

    [EMIT_FLUSH_CLIENT]() {
      const { client } = action;

      return state.deleteIn(['clients', client.clientId]);
    }
  };

  return handleAction(state, action, reducers);
};

export default clientsReducer;
