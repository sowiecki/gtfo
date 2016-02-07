import { UPDATE_MARKERS } from '../ducks/markers';

import store from '../store/configure-store';

export default {
  update(markers) {
    store().dispatch({
      type: UPDATE_MARKERS,
      markers
    });
  },
  getMarkers() {
    return store().getState().markersReducer;
  }
};
