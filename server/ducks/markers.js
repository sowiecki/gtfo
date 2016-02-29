import socketController from '../controllers/socket';

import { markers } from '../environment';
import { EMIT_CLIENT_CONNECTED } from './rooms';
import { INITIALIZE_MARKERS } from '../constants/events';

export const EMIT_SEND_MARKERS = 'EMIT_SEND_MARKERS';

const markersReducer = (state = markers, action) => {
  const { type } = action;

  switch (type) {
    case EMIT_CLIENT_CONNECTED:
      socketController.handle(INITIALIZE_MARKERS, state, action.client);
      break;
  }

  return state;
};

export default markersReducer;
