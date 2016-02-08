import immutable from 'immutable';
import { UPDATE_LOCATION } from 'react-router-redux';

export const CONNECT_LAYOUT_SOCKET = 'CONNECT_LAYOUT_SOCKET';
export const EMIT_LAYOUT_SOCKET_ERROR = 'EMIT_LAYOUT_SOCKET_ERROR';

// export const FETCH_ROOM_STATUSES = 'FETCH_ROOM_STATUSES';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_FETCH_ROOM_STATUSES_ERROR = 'EMIT_FETCH_ROOM_STATUSES_ERROR';

// export const FETCH_MARKERS = 'FETCH_MARKERS';
export const EMIT_MARKERS_ACTIVATED = 'EMIT_MARKERS_ACTIVATED';
export const EMIT_MARKERS_DEACTIVED = 'EMIT_MARKERS_DEACTIVED';
export const EMIT_MARKERS_UPDATE = 'EMIT_MARKERS_UPDATE';
export const EMIT_FETCH_MARKERS_ERROR = 'EMIT_FETCH_MARKERS_ERROR';
export const EMIT_CLEAR_FETCH_ERRORS = 'EMIT_CLEAR_FETCH_ERRORS';

export const connectLayoutSocket = () => ({
  type: CONNECT_LAYOUT_SOCKET
});

export const emitMarkersActivated = (markers) => ({
  type: EMIT_MARKERS_ACTIVATED,
  markers
});

export const emitMarkerDeactivated = (marker) => ({
  type: EMIT_MARKERS_DEACTIVED,
  marker
});

const initialState = immutable.fromJS({
  meetingRooms: [],
  markers: []
});

const layoutReducer = (state = initialState, action) => {
  const { type,
          meetingRooms,
          markers,
          // payload,
          error } = action;

  switch (type) {
    case EMIT_ROOM_STATUSES_UPDATE:
      state = state.set('meetingRooms', meetingRooms);

      break;
    case EMIT_FETCH_ROOM_STATUSES_ERROR:
      state = state.set('error', error);

      break;
    case EMIT_CLEAR_FETCH_ERRORS:
      state = state.delete('error');

      break;
    case UPDATE_LOCATION:
      // state = state.merge({
      //   markers: [{
      //     name: payload.search.replace('?whereAmI=', '')
      //   }]
      // });

      break;
    case EMIT_MARKERS_UPDATE:
    case EMIT_MARKERS_ACTIVATED:
      state = state.set('markers', markers);

      break;
    case EMIT_MARKERS_DEACTIVED:
      state = initialState;

      break;
  }

  return state;
};

export default layoutReducer;
