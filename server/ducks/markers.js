import { readFileSync } from 'fs';

import socketController from '../controllers/socket';

import { EMIT_CLIENT_CONNECTED } from './rooms';
import { INITIALIZE_MARKERS } from '../constants/events';

const clientMarkers = JSON.parse(readFileSync('./environment/clients.json', 'utf8'));

export const EMIT_SEND_MARKERS = 'EMIT_SEND_MARKERS';

const markersReducer = (state = clientMarkers, action) => {
  const { type, markers } = action;

  switch (type) {
    case EMIT_CLIENT_CONNECTED:
      socketController.handle(INITIALIZE_MARKERS, state, action.client);
      break;
  }

  return state;
};

export default markersReducer;
