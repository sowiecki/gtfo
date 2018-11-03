import { colors, fonts } from '../../common/styles';

export const styles = {
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
