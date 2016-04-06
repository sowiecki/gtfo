/* eslint default-case:0 */
import socketController from '../controllers/socket';

import { markers } from '../environment';
import { EMIT_CLIENT_CONNECTED } from './rooms';
import { INITIALIZE_MARKERS } from '../constants';

export const EMIT_SEND_MARKERS = 'EMIT_SEND_MARKERS';

const markersReducer = (state = markers, action) => {
  switch (action.type) {
    case EMIT_CLIENT_CONNECTED:
      socketController.handle(INITIALIZE_MARKERS, state, action.client);
      break;
  }

  return state;
};

export default markersReducer;
