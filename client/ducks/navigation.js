import immutable from 'immutable';

export const EMIT_SITE_NAV_TOGGLE = 'EMIT_SITE_NAV_TOGGLE';

export const emitSiteNavToggle = (siteNavOpen) => ({
  type: EMIT_SITE_NAV_TOGGLE,
  navigation: { siteNavOpen }
});

const initialState = {
  siteNavOpen: false
};

const navigationReducer = (state = initialState, action) => {
  const { type, navigation } = action;

  switch (type) {
    case EMIT_SITE_NAV_TOGGLE:
      state = { navigation };

      break;
  }

  return immutable.fromJS(state);
};

export default navigationReducer;
