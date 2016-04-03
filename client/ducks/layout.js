import immutable from 'immutable';

import { pluckLocations } from '../utils';

import { EMIT_HANDSHAKE_RECEIVED } from './navigation';
import { FAHRENHEIT, CELCIUS } from '../constants';

export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const EMIT_LAYOUT_SOCKET_ERROR = 'EMIT_LAYOUT_SOCKET_ERROR';

export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_FETCH_ROOM_STATUSES_ERROR = 'EMIT_FETCH_ROOM_STATUSES_ERROR';

export const EMIT_SET_ROOM_PING = 'EMIT_SET_ROOM_PING';
export const EMIT_CLEAR_PING = 'EMIT_CLEAR_PING';

export const EMIT_TOGGLE_DISPLAY_LEGEND = 'EMIT_TOGGLE_DISPLAY_LEGEND';
export const EMIT_TOGGLE_DISPLAY_TEMPERATURE = 'EMIT_TOGGLE_DISPLAY_TEMPERATURE';
export const EMIT_TOGGLE_TEMP_SCALE = 'EMIT_TOGGLE_TEMP_SCALE';

export const EMIT_MARKERS_ACTIVATED = 'EMIT_MARKERS_ACTIVATED';
export const EMIT_MARKERS_DEACTIVED = 'EMIT_MARKERS_DEACTIVED';
export const EMIT_MARKERS_UPDATE = 'EMIT_MARKERS_UPDATE';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';
export const EMIT_FETCH_MARKERS_ERROR = 'EMIT_FETCH_MARKERS_ERROR';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

export const connectSocket = (payload) => ({
  type: CONNECT_SOCKET,
  payload
});

export const emitClearPing = () => ({
  type: EMIT_CLEAR_PING
});

export const emitToggleDisplayLegend = (displayLegend) => ({
  type: EMIT_TOGGLE_DISPLAY_LEGEND,
  displayLegend
});

export const emitToggleDisplayTemp = (displayTemp) => ({
  type: EMIT_TOGGLE_DISPLAY_TEMPERATURE,
  displayTemp
});

export const emitToggleTempScale = (tempScale) => ({
  type: EMIT_TOGGLE_TEMP_SCALE,
  tempScale
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
  markers: [],
  displayLegend: true,
  displayTemp: false,
  tempScale: FAHRENHEIT
});

const layoutReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_HANDSHAKE_RECEIVED]() {
      const { enableTemperature, defaultTempScale } = action.config;

      return state
        .set('displayTemp', enableTemperature || false)
        .set('tempScale', defaultTempScale || FAHRENHEIT);
    },

    [EMIT_ROOM_STATUSES_UPDATE]() {
      const locations = pluckLocations(action.meetingRooms);

      return state
        .set('meetingRooms', action.meetingRooms)
        .set('locations', locations);
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

    [EMIT_CLEAR_PING]() {
      return state.set('ping', null);
    },

    [EMIT_TOGGLE_DISPLAY_LEGEND]() {
      return state.set('displayLegend', !action.displayLegend);
    },

    [EMIT_TOGGLE_DISPLAY_TEMPERATURE]() {
      return state.set('displayTemp', !action.displayTemp);
    },

    [EMIT_TOGGLE_TEMP_SCALE]() {
      const tempScale = action.tempScale === FAHRENHEIT ? CELCIUS : FAHRENHEIT;

      return state.set('tempScale', tempScale);
    },

    [EMIT_MARKERS_UPDATE]() {
      return state.set('markers', action.markers);
    },

    [EMIT_ROOM_TEMPERATURE_UPDATE]() {
      const meetingRooms = state.get('meetingRooms').map((room) => {
        if (action.room.id === room.id) {
          room.fahrenheitTmpVoltage = action.room.fahrenheitTmpVoltage;
        }
        return room;
      });

      return state.set('meetingRooms', meetingRooms);
    },

    [EMIT_ROOM_MOTION_UPDATE]() {
      return state;
    }
  };

  return reducers[action.type] ? reducers[action.type]() : state;
};

export default layoutReducer;
