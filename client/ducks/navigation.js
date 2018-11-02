import immutable from 'immutable';

import { handleAction } from '../utils';
import { DEFAULT_DOCUMENT_TITLE, DEFAULT_NOTE } from '../constants';
import { MOBILE_WIDTH_BREAKPOINT } from '../components/common/styles';

export const EMIT_HANDSHAKE_RECEIVED = 'EMIT_HANDSHAKE_RECEIVED';

export const EMIT_DEVICE_WIDTH_UPDATE = 'EMIT_DEVICE_WIDTH_UPDATE';

export const EMIT_SITE_NAV_TOGGLE = 'EMIT_SITE_NAV_TOGGLE';

export const EMIT_LOCATION_UPDATE = 'EMIT_LOCATION_UPDATE';

export const EMIT_TIME_TRAVEL_MODAL_TOGGLE = 'EMIT_TIME_TRAVEL_MODAL_TOGGLE';
export const EMIT_TIME_TRAVEL_ERROR = 'EMIT_TIME_TRAVEL_ERROR';
export const CLEAR_TIME_TRAVEL_ERROR = 'CLEAR_TIME_TRAVEL_ERROR';

export const EMIT_TIME_TRAVEL_UPDATE = 'EMIT_TIME_TRAVEL_UPDATE';
export const EMIT_TIME_SLIDER_VALUE_UPDATE = 'EMIT_TIME_SLIDER_VALUE_UPDATE';

export const EMIT_MODAL_CONTENT_UPDATE = 'EMIT_MODAL_CONTENT_UPDATE';

export const emitDeviceWidthUpdate = () => ({
  type: EMIT_DEVICE_WIDTH_UPDATE
});

export const emitToggleSiteNav = (siteNavOpen) => ({
  type: EMIT_SITE_NAV_TOGGLE,
  siteNavOpen
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

export const emitModalContentUpdate = (modalContent) => ({
  type: EMIT_MODAL_CONTENT_UPDATE,
  modalContent
});

const initialState = immutable.fromJS({
  documentTitle: DEFAULT_DOCUMENT_TITLE,
  note: DEFAULT_NOTE,
  deviceWidth: document.body.clientWidth,
  siteNavOpen: document.body.clientWidth > MOBILE_WIDTH_BREAKPOINT,
  timeTravelControlsOpen: false,
  timeTravelTime: null,
  timeSliderValue: 0,
  modalContent: null
});

const navigationReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_HANDSHAKE_RECEIVED]: () => {
      const { title, note } = action.config;

      return state
        .set('documentTitle', title || DEFAULT_DOCUMENT_TITLE)
        .set('note', note || DEFAULT_NOTE);
    },

    [EMIT_DEVICE_WIDTH_UPDATE]: () => state.set('deviceWidth', document.body.clientWidth),

    [EMIT_SITE_NAV_TOGGLE]: () => state.set('siteNavOpen', action.siteNavOpen),

    [EMIT_TIME_TRAVEL_MODAL_TOGGLE]: () => state.set('timeTravelControlsOpen', action.timeTravelControlsOpen),

    [EMIT_TIME_TRAVEL_UPDATE]: () => state.set('timeTravelTime', action.timeTravelTime),

    [EMIT_TIME_SLIDER_VALUE_UPDATE]: () => state.set('timeSliderValue', action.timeSliderValue),

    [EMIT_MODAL_CONTENT_UPDATE]: () => state.set('modalContent', action.modalContent)
  };

  return handleAction(state, action, reducers);
};

export default navigationReducer;
