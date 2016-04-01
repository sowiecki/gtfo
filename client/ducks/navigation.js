import immutable from 'immutable';

import { updateLocationIndex } from '../utils';
import { DEFAULT_DOCUMENT_TITLE } from '../constants';

export const EMIT_HANDSHAKE_RECEIVED = 'EMIT_HANDSHAKE_RECEIVED';
export const EMIT_SITE_NAV_TOGGLE = 'EMIT_SITE_NAV_TOGGLE';
export const EMIT_LOCATION_MODAL_TOGGLE = 'EMIT_LOCATION_MODAL_TOGGLE';
export const EMIT_LOCATION_UPDATE = 'EMIT_LOCATION_UPDATE';
export const EMIT_LOCATION_INDEX_UPDATE = 'EMIT_LOCATION_INDEX_UPDATE';

export const emitLocationIndexUpdate = (newLocation, anchorId) => {
  updateLocationIndex(newLocation, anchorId);

  return {
    type: EMIT_LOCATION_INDEX_UPDATE,
    newLocation,
    anchorId
  };
};

export const emitSiteNavToggle = (siteNavOpen) => ({
  type: EMIT_SITE_NAV_TOGGLE,
  siteNavOpen
});

export const emitLocationModalToggle = (locationModalOpen) => ({
  type: EMIT_LOCATION_MODAL_TOGGLE,
  locationModalOpen
});

export const emitLocationUpdate = (location) => ({
  type: EMIT_LOCATION_UPDATE,
  location
});

const initialState = immutable.fromJS({
  documentTitle: DEFAULT_DOCUMENT_TITLE,
  siteNavOpen: false,
  locationModalOpen: false
});

const navigationReducer = (state = initialState, action) => {
  const { type, siteNavOpen, locationModalOpen } = action;

  const reducers = {
    [EMIT_HANDSHAKE_RECEIVED]() {
      return state.set('documentTitle', action.config.title);
    },
    [EMIT_SITE_NAV_TOGGLE]() {
      return state.set('siteNavOpen', siteNavOpen);
    },

    [EMIT_LOCATION_MODAL_TOGGLE]() {
      return state.set('locationModalOpen', !locationModalOpen);
    },

    [EMIT_LOCATION_UPDATE]() {
      return state;
    },

    [EMIT_LOCATION_INDEX_UPDATE]() {
      return state;
    }
  };

  return reducers[type] ? reducers[type]() : state;
};

export default navigationReducer;
