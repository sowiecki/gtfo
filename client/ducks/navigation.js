/* globals location */
import immutable from 'immutable';

import history from '../config/history';
import { handleAction } from '../utils';
import { DEFAULT_DOCUMENT_TITLE } from '../constants';

export const EMIT_HANDSHAKE_RECEIVED = 'EMIT_HANDSHAKE_RECEIVED';

export const EMIT_DEVICE_WIDTH_UPDATE = 'EMIT_DEVICE_WIDTH_UPDATE';

export const EMIT_SITE_NAV_TOGGLE = 'EMIT_SITE_NAV_TOGGLE';

export const EMIT_LOCATION_UPDATE = 'EMIT_LOCATION_UPDATE';
export const EMIT_LOCATION_INDEX_UPDATE = 'EMIT_LOCATION_INDEX_UPDATE';

export const EMIT_TIME_TRAVEL_MODAL_TOGGLE = 'EMIT_TIME_TRAVEL_MODAL_TOGGLE';
export const EMIT_TIME_TRAVEL_ERROR = 'EMIT_TIME_TRAVEL_ERROR';
export const CLEAR_TIME_TRAVEL_ERROR = 'CLEAR_TIME_TRAVEL_ERROR';

export const EMIT_TIME_TRAVEL_UPDATE = 'EMIT_TIME_TRAVEL_UPDATE';
export const EMIT_TIME_SLIDER_VALUE_UPDATE = 'EMIT_TIME_SLIDER_VALUE_UPDATE';

export const emitDeviceWidthUpdate = () => ({
  type: EMIT_DEVICE_WIDTH_UPDATE
});

export const emitLocationIndexUpdate = (newLocation, anchorId) => ({
  type: EMIT_LOCATION_INDEX_UPDATE,
  newLocation,
  anchorId
});

export const emitToggleSiteNav = (siteNavOpen) => ({
  type: EMIT_SITE_NAV_TOGGLE,
  siteNavOpen
});

export const emitLocationUpdate = (location) => ({
  type: EMIT_LOCATION_UPDATE,
  location
});

export const emitTimeTravelControlsToggle = (timeTravelControlsOpen) => ({
  type: EMIT_TIME_TRAVEL_MODAL_TOGGLE,
  timeTravelError: null,
  timeTravelControlsOpen
});

export const emitTimeTravelUpdate = (timeTravelTime) => ({
  type: EMIT_TIME_TRAVEL_UPDATE,
  timeTravelTime
});

export const emitTimeSliderValueUpdate = (timeSliderValue) => ({
  type: EMIT_TIME_SLIDER_VALUE_UPDATE,
  timeSliderValue
});

const initialState = immutable.fromJS({
  documentTitle: DEFAULT_DOCUMENT_TITLE,
  deviceWidth: document.body.clientWidth,
  siteNavOpen: true,
  timeTravelControlsOpen: false,
  timeTravelTime: null,
  timeSliderValue: 0
});

const navigationReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_HANDSHAKE_RECEIVED]() {
      const { title } = action.config;

      return state.set('documentTitle', title || DEFAULT_DOCUMENT_TITLE);
    },

    [EMIT_DEVICE_WIDTH_UPDATE]() {
      return state.set('deviceWidth', document.body.clientWidth);
    },

    [EMIT_SITE_NAV_TOGGLE]() {
      return state.set('siteNavOpen', action.siteNavOpen);
    },

    [EMIT_LOCATION_UPDATE]() {
      return state;
    },

    [EMIT_LOCATION_INDEX_UPDATE]() {
      history.push({
        pathname: action.newLocation,
        query: { anchor: action.anchorId }
      });

      return state;
    },

    [EMIT_TIME_TRAVEL_MODAL_TOGGLE]() {
      return state.set('timeTravelControlsOpen', action.timeTravelControlsOpen);
    },

    [EMIT_TIME_TRAVEL_UPDATE]() {
      return state.set('timeTravelTime', action.timeTravelTime);
    },

    [EMIT_TIME_SLIDER_VALUE_UPDATE]() {
      return state.set('timeSliderValue', action.timeSliderValue);
    }
  };

  return handleAction(state, action, reducers);
};

export default navigationReducer;
