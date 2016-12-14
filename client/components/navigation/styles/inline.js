import { colors, fonts } from '../../common/styles';

export const styles = {
  drawerContainer: {
    top: 'auto'
  },

  toolbar: {
    justifyContent: 'initial',
    backgroundColor: colors.primary,
    height: '48px',
    overflow: 'hidden'
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
    lineHeight: 1.5,
    overflowY: 'visible'
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

  mobileLocationSelectionLabel: {
    padding: '0 20px',
    left: '-14%',
    width: '200px',
    fontSize: '12px',
    textAlign: 'right',
    textTransform: 'uppercase',
    color: colors.WHITE,
    overflow: 'hidden'
  },

  mobileLocationSelectionMenuItem: {
    fontSize: '12px',
    textTransform: 'uppercase'
  },

  mobileLocationSelectionUnderline: {
    display: 'none'
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
  },

  timeTravelControls: {
    position: 'absolute',
    height: '80px',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.DARK_GREY
  },

  timeTravelDismiss: {
    position: 'absolute',
    left: 0
  },

  timeTravelDismissColor: colors.GHOST_WHITE,

  timeDisplay: {
    padding: '2px',
    font: `24px ${fonts.secondary}, sans-serif`,
    color: colors.WHITE
  },

  timeUnavailable: {
    font: `12px ${fonts.secondary}, sans-serif`,
    lineHeight: 1.25,
    color: colors.WHITE
  },

  timeSlider: {
    margin: '0 auto',
    position: 'relative',
    top: '-24px',
    right: 0,
    left: 0,
    maxWidth: '70%'
  },

  timeHintText: {
    position: 'absolute',
    margin: 'auto',
    fontSize: '12px',
    left: 0,
    right: 0,
    bottom: 0,
    color: colors.WHITE
  },

  note: {
    position: 'absolute',
    bottom: '50px'
  }
};

export const LEFT_HAND_NAV_WIDTH = 300;
