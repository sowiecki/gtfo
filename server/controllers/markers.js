import { EMIT_SEND_MARKERS } from '../ducks/markers';

import store from '../store/configure-store';

// TODO might get rid of this, might keep it for sending paths
export default {
  update(markers) {
    store().dispatch({
      type: EMIT_SEND_MARKERS,
      markers
    });
  },
  getMarkers() {
    return store().getState().markersReducer;
  }
};
