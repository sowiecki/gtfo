import immutable from 'immutable';

export const EMIT_SITE_NAV_TOGGLE = 'EMIT_SITE_NAV_TOGGLE';

export const emitSiteNavToggle = (siteNavOpen) => ({
  type: EMIT_SITE_NAV_TOGGLE,
  siteNavOpen
});

const initialState = immutable.fromJS({
  siteNavOpen: false
});

const navigationReducer = (state = initialState, action) => {
  const { type, siteNavOpen } = action;

  switch (type) {
    case EMIT_SITE_NAV_TOGGLE:
      return state.set('siteNavOpen', siteNavOpen);
    default:
      return state;
  }
};

export default navigationReducer;
