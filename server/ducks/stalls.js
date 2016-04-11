/* eslint default-case:0, no-case-declarations:0 */
import immutable from 'immutable';

import socketController from '../controllers/socket';

import { coordinates } from '../environment';
import { EMIT_CLIENT_CONNECTED } from './clients';
import { INITIALIZE_STALLS, STALL_OCCUPANCIES_UPDATE } from '../constants';
import { handleAction } from '../utils';

export const EMIT_STALL_OCCUPANCIES_UPDATE = 'EMIT_STALL_OCCUPANCIES_UPDATE';
export const FETCH_STALL_OCCUPANCIES = 'FETCH_STALL_OCCUPANCIES';

const initialState = immutable.fromJS({
  stalls: []
});

const applyCoordinates = (stall) => Object.assign(stall, { coordinates: coordinates[stall.id] });

const clientsReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_CLIENT_CONNECTED]() {
      const stalls = state.get('stalls').map(applyCoordinates);

      socketController.handle(INITIALIZE_STALLS, stalls, action.client);

      return state;
    },

    [EMIT_STALL_OCCUPANCIES_UPDATE]() {
      const stalls = action.stalls.map(applyCoordinates);

      socketController.handle(STALL_OCCUPANCIES_UPDATE, stalls);

      return state.set('stalls', stalls);
    },
  };

  return handleAction(state, action, reducers);
};

export default clientsReducer;
