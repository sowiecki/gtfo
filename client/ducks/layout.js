import immutable from 'immutable';
import cookies from 'js-cookie';

import { pluckLocations, handleAction } from 'utils';
import { FAHRENHEIT, CELSIUS, DEFAULT, COOKIE_NAMESPACE } from 'constants';
import { EMIT_HANDSHAKE_RECEIVED } from './navigation';

export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const EMIT_LAYOUT_SOCKET_ERROR = 'EMIT_LAYOUT_SOCKET_ERROR';

export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_FETCH_ROOM_STATUSES_ERROR = 'EMIT_FETCH_ROOM_STATUSES_ERROR';

export const EMIT_SET_ROOM_PING = 'EMIT_SET_ROOM_PING';
export const EMIT_CLEAR_PING = 'EMIT_CLEAR_PING';

export const EMIT_DISPLAY_LEGEND_TOGGLE = 'EMIT_DISPLAY_LEGEND_TOGGLE';
export const EMIT_DISPLAY_TEMPERATURE_TOGGLE = 'EMIT_DISPLAY_TEMPERATURE_TOGGLE';
export const EMIT_TEMP_SCALE_TOGGLE = 'EMIT_TEMP_SCALE_TOGGLE';

export const EMIT_MARKERS_UPDATE = 'EMIT_MARKERS_UPDATE';

export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';

export const EMIT_STALL_OCCUPANCIES_UPDATE = 'EMIT_STALL_OCCUPANCIES_UPDATE';

export const EMIT_FETCH_MARKERS_ERROR = 'EMIT_FETCH_MARKERS_ERROR';
export const EMIT_CLEAR_CONNECTION_ERRORS = 'EMIT_CLEAR_CONNECTION_ERRORS';

export const EMIT_STATUSES_THEME_UPDATE = 'EMIT_STATUSES_THEME_UPDATE';

export const EMIT_ADDITIONAL_INFO_TOGGLE = 'EMIT_ADDITIONAL_INFO_TOGGLE';

export const connectSocket = (payload) => ({
  type: CONNECT_SOCKET,
  payload
});

export const emitPingClear = () => ({
  type: EMIT_CLEAR_PING
});

export const emitDisplayLegendToggle = (displayLegend) => ({
  type: EMIT_DISPLAY_LEGEND_TOGGLE,
  displayLegend
});

export const emitDisplayTempToggle = (displayTemp) => ({
  type: EMIT_DISPLAY_TEMPERATURE_TOGGLE,
  displayTemp
});

export const emitTempScaleToggle = (unitOfTemp) => ({
  type: EMIT_TEMP_SCALE_TOGGLE,
  unitOfTemp
});

export const emitStatusesThemeUpdate = (statusesTheme) => ({
  type: EMIT_STATUSES_THEME_UPDATE,
  statusesTheme
});

export const emitAdditionalInfoToggle = (displayAdditionalInfo) => ({
  type: EMIT_ADDITIONAL_INFO_TOGGLE,
  displayAdditionalInfo
});

const initialState = immutable.fromJS({
  displayAdditionalInfo: false,
  meetingRooms: null,
  markers: null,
  stalls: null,
  displayLegend: true,
  displayTemp: true, // User UI option for toggling temperature display on map
  enableTemp: false, // Server variable that governs display of temperature features
  enableMotion: false, // Server variable that governs display of motion features
  enableStalls: false, // Server variable that governs display of stall features
  unitOfTemp: FAHRENHEIT,
  statusesTheme: cookies.get(`${COOKIE_NAMESPACE}/statusesTheme`) || DEFAULT
});

const layoutReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_HANDSHAKE_RECEIVED]: () => {
      const { enableTemperature, enableMotion, enableStalls, defaultTempScale } = action.config;

      return state
        .set('enableTemp', enableTemperature || false)
        .set('unitOfTemp', defaultTempScale || FAHRENHEIT)
        .set('enableMotion', enableMotion || false)
        .set('enableStalls', enableStalls || false);
    },

    [EMIT_ROOM_STATUSES_UPDATE]: () => {
      const locations = pluckLocations(action.meetingRooms);

      return state.set('meetingRooms', action.meetingRooms).set('locations', locations);
    },

    [EMIT_FETCH_ROOM_STATUSES_ERROR]: () => state.set('error', action.error),

    [EMIT_STALL_OCCUPANCIES_UPDATE]: () => state.set('stalls', action.stalls),

    [EMIT_CLEAR_CONNECTION_ERRORS]: () => state.delete('error'),

    [EMIT_SET_ROOM_PING]: () => state.set('ping', action.ping),

    [EMIT_CLEAR_PING]: () => state.set('ping', null),

    [EMIT_DISPLAY_LEGEND_TOGGLE]: () => state.set('displayLegend', !action.displayLegend),

    [EMIT_DISPLAY_TEMPERATURE_TOGGLE]: () => state.set('displayTemp', !action.displayTemp),

    [EMIT_ADDITIONAL_INFO_TOGGLE]: () => state.set('displayAdditionalInfo', !action.displayAdditionalInfo),

    [EMIT_TEMP_SCALE_TOGGLE]: () => {
      const unitOfTemp = action.unitOfTemp === FAHRENHEIT ? CELSIUS : FAHRENHEIT;

      return state.set('unitOfTemp', unitOfTemp);
    },

    [EMIT_MARKERS_UPDATE]: () => state.set('markers', action.markers),

    [EMIT_ROOM_TEMPERATURE_UPDATE]: () => {
      const meetingRooms = state.get('meetingRooms').map((room) => {
        if (action.room.id === room.id) {
          room.thermo = action.room.thermo;
        }

        return room;
      });

      return state.set('meetingRooms', meetingRooms);
    },

    [EMIT_ROOM_MOTION_UPDATE]: () => state,

    [EMIT_STATUSES_THEME_UPDATE]: () => {
      cookies.set(`${COOKIE_NAMESPACE}/statusesTheme`, action.statusesTheme);

      return state.set('statusesTheme', action.statusesTheme);
    }
  };

  return handleAction(state, action, reducers);
};

export default layoutReducer;
