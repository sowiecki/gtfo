import immutable from 'immutable';
import { UPDATE_LOCATION } from 'react-router-redux';

export const CONNECT_LAYOUT_SOCKET = 'CONNECT_LAYOUT_SOCKET';
export const EMIT_LAYOUT_SOCKET_ERROR = 'EMIT_LAYOUT_SOCKET_ERROR';

export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_FETCH_ROOM_STATUSES_ERROR = 'EMIT_FETCH_ROOM_STATUSES_ERROR';

export const EMIT_SET_ROOM_PING = 'EMIT_SET_ROOM_PING';

export const EMIT_MARKERS_ACTIVATED = 'EMIT_MARKERS_ACTIVATED';
export const EMIT_MARKERS_DEACTIVED = 'EMIT_MARKERS_DEACTIVED';
export const EMIT_MARKERS_UPDATE = 'EMIT_MARKERS_UPDATE';
export const EMIT_FETCH_MARKERS_ERROR = 'EMIT_FETCH_MARKERS_ERROR';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

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

const mapPing = (state, origin, ping) => {
  return state.get('meetingRooms').map((meetingRoom) => {
    if (meetingRoom.id === ping.id) {
      meetingRoom.pinged = true;
    }

    return meetingRoom;
  });
};

const layoutReducer = (state = initialState, action) => {
  const { type,
          ping,
          error } = action;

  switch (type) {
    case EMIT_ROOM_STATUSES_UPDATE:
      return state.set('meetingRooms', action.meetingRooms);
    case EMIT_FETCH_ROOM_STATUSES_ERROR:
      return state.set('error', error);
    case EMIT_CLEAR_CONNECTION_ERRORS:
      return state.delete('error');
    case EMIT_SET_ROOM_PING: // TODO add conditional for locator origin!
      return state.set('meetingRooms', mapPing(state, origin, ping));
    case UPDATE_LOCATION:
      // return state.merge({
      //   markers: [{
      //     name: payload.search.replace('?whereAmI=', '')
      //   }]
      // });
    case EMIT_MARKERS_UPDATE:
    case EMIT_MARKERS_ACTIVATED:
      // return state.set('markers', markers);
    case EMIT_MARKERS_DEACTIVED:
      return initialState;
    default:
      return state;
  }
};

export default layoutReducer;
