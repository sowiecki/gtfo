/* eslint default-case:0, no-case-declarations:0 */
import immutable from 'immutable';

import socketController from '../controllers/socket';

import { STALLS_OCCUPANCIES_UPDATE } from '../constants';
import { handleAction } from '../utils';

export const EMIT_STALLS_OCCUPANCIES_UPDATE = 'EMIT_STALLS_OCCUPANCIES_UPDATE';
export const FETCH_STALL_OCCUPANCIES = 'FETCH_STALL_OCCUPANCIES';

const initialState = immutable.fromJS({
  stallOccupancies: {}
});

const clientsReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_STALLS_OCCUPANCIES_UPDATE]() {
      state.setIn(['stallOccupancies'], action.stallOccupancies);

      socketController.handle(STALLS_OCCUPANCIES_UPDATE, state);

      return state;
    },
  };

  return handleAction(state, action, reducers);
};

export default clientsReducer;
