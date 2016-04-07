/* eslint default-case:0 */
import socketController from '../controllers/socket';

import { markers } from '../environment';
import { EMIT_CLIENT_CONNECTED } from './clients';
import { INITIALIZE_MARKERS } from '../constants';
import { handleAction } from '../utils';

export const EMIT_SEND_MARKERS = 'EMIT_SEND_MARKERS';

const markersReducer = (state = markers, action) => {
  const reducers = {
    [EMIT_CLIENT_CONNECTED]() {
      socketController.handle(INITIALIZE_MARKERS, state, action.client);

      return state;
    }
  };

  return handleAction(state, action, reducers);
};

export default markersReducer;
