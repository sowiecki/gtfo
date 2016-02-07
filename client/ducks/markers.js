import immutable from 'immutable';
import { UPDATE_LOCATION } from 'react-router-redux';

export const EMIT_MARKER_ACTIVATED = 'EMIT_MARKER_ACTIVATED';
export const EMIT_MARKER_DEACTIVED = 'EMIT_MARKER_DEACTIVED';

export const emitMarkerActivated = (markerLocation) => ({
  type: EMIT_MARKER_ACTIVATED,
  markers: { markerLocation }
});

export const emitMarkerDeactivated = () => ({ type: EMIT_MARKER_DEACTIVED });

const initialState = {
  markerLocation: ''
};

const markers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      state.markerLocation = action.payload.search.replace('?whereAmI=', '');

      break;
    case EMIT_MARKER_ACTIVATED:
      state = action.markers;

      break;
    case EMIT_MARKER_DEACTIVED:
      state = '';

      break;
  }

  return immutable.fromJS(state);
};

export default markers;
