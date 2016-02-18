import immutable from 'immutable';

export const EMIT_SITE_NAV_TOGGLE = 'EMIT_SITE_NAV_TOGGLE';
export const EMIT_LOCATION_MODAL_TOGGLE = 'EMIT_LOCATION_MODAL_TOGGLE';
export const EMIT_LOCATION_UPDATE = 'EMIT_LOCATION_UPDATE';

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

  switch (type) {
    case EMIT_SITE_NAV_TOGGLE:
      return state.set('siteNavOpen', siteNavOpen);
    case EMIT_LOCATION_MODAL_TOGGLE:
      return state.set('locationModalOpen', locationModalOpen);
    case EMIT_LOCATION_UPDATE:
      return state;
    default:
      return state;
  }
};

export default navigationReducer;
