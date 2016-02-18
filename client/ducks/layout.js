import immutable from 'immutable';

import { pluckLocations } from '../utils/rooms';

export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const EMIT_LAYOUT_SOCKET_ERROR = 'EMIT_LAYOUT_SOCKET_ERROR';

export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_FETCH_ROOM_STATUSES_ERROR = 'EMIT_FETCH_ROOM_STATUSES_ERROR';

export const EMIT_SET_ROOM_PING = 'EMIT_SET_ROOM_PING';
export const EMIT_CLEAR_PING = 'EMIT_CLEAR_PING';

export const EMIT_LOCATION_INDEX_UPDATE = 'EMIT_LOCATION_INDEX_UPDATE';

export const EMIT_MARKERS_ACTIVATED = 'EMIT_MARKERS_ACTIVATED';
export const EMIT_MARKERS_DEACTIVED = 'EMIT_MARKERS_DEACTIVED';
export const EMIT_MARKERS_UPDATE = 'EMIT_MARKERS_UPDATE';
export const EMIT_FETCH_MARKERS_ERROR = 'EMIT_FETCH_MARKERS_ERROR';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

export const connectSocket = () => ({
  type: CONNECT_SOCKET
});

export const clearPing = () => ({
  type: EMIT_CLEAR_PING
});

export const emitLocationIndexUpdate = (newIndex) => {
  console.log(newIndex)
  return {
    type: EMIT_LOCATION_INDEX_UPDATE,
    newIndex
  }
};

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
  const { meetingRooms } = action;

  const reducers = {
    [EMIT_ROOM_STATUSES_UPDATE]() {
      return state
        .set('meetingRooms', meetingRooms)
        .set('locations', pluckLocations(meetingRooms));
    },

    [EMIT_FETCH_ROOM_STATUSES_ERROR]() {
      return state.set('error', action.error);
    },

    [EMIT_CLEAR_CONNECTION_ERRORS]() {
      return state.delete('error');
    },

    [EMIT_SET_ROOM_PING]() {
      return state.set('ping', action.ping);
    },

    [EMIT_LOCATION_INDEX_UPDATE]() {
      console.log('test', action)
      return state;
    },

    [EMIT_CLEAR_PING]() {
      return state.set('ping', null);
    },

    [EMIT_MARKERS_DEACTIVED]() {
      return initialState;
    }
  };

  return reducers[action.type] ? reducers[action.type]() : state;
};

export default layoutReducer;
