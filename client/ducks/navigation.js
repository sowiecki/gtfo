import immutable from 'immutable';

import history from '../config/history';

export const EMIT_SITE_NAV_TOGGLE = 'EMIT_SITE_NAV_TOGGLE';
export const EMIT_LOCATION_MODAL_TOGGLE = 'EMIT_LOCATION_MODAL_TOGGLE';
export const EMIT_LOCATION_UPDATE = 'EMIT_LOCATION_UPDATE';
export const EMIT_LOCATION_INDEX_UPDATE = 'EMIT_LOCATION_INDEX_UPDATE';

// TODO make generic func to share with layout controller
export const emitLocationIndexUpdate = (newLocation, anchorId) => {
  const anchor = anchorId ? `/anchor/${anchorId}` : '';
  history.push(`/${newLocation}${anchor}`);

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
  siteNavOpen: false,
  locationModalOpen: false
});

const navigationReducer = (state = initialState, action) => {
  const { type, siteNavOpen, location, locationModalOpen } = action;

  const reducers = {
    [EMIT_SITE_NAV_TOGGLE]() {
      return state.set('siteNavOpen', siteNavOpen);
    },

    [EMIT_LOCATION_MODAL_TOGGLE]() {
      return state.set('locationModalOpen', locationModalOpen);
    },

    [EMIT_LOCATION_UPDATE]() {
      return state;
    },

    [EMIT_LOCATION_INDEX_UPDATE]() {
      return state;
    }
  }

  return reducers[action.type] ? reducers[action.type]() : state;
};

export default navigationReducer;
