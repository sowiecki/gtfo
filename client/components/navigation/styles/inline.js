import { colors, fonts } from '../../common/styles';

export const styles = {
  toolbar: {
    justifyContent: 'initial',
    backgroundColor: colors.primary,
    height: '48px'
  },

  toolbarTitle: {
    margin: 0,
    color: colors.WHITE,
    fontSize: '35px',
    lineHeight: '48px',
    fontWeight: 8,
    fontFamily: fonts.primary
  },

  toolbarTabs: {
    fontFamily: fonts.tertiary,
    padding: 0,
    lineHeight: 1.5
  },

  toolbarTab: {
    fontSize: '16px',
    minWidth: '200px',
    backgroundColor: colors.primary
  },

  menuButton: {
    color: colors.WHITE,
    pointerEvents: 'all'
  },

  navIcons: {
    marginLeft: '24px'
  },

  tempScaleNavIcon: {
    margin: '6px 6px 6px 29px',
    fontFamily: fonts.secondary
  },

  fadedIcon: {
    opacity: 0.5
  }
};

export const LEFT_HAND_NAV_WIDTH = 300;
