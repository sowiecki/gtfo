import { colors, fonts } from './base';

export const styles = {
  // Used to override element styles on dark backgrounds
  lightOnDark: {
    color: colors.WHITE
  },

  loadingContainer: {
    zIndex: 200,
    position: 'absolute',
    top: '25%',
    height: '50%',
    width: '100%',
    textAlign: 'center'
  },

  progressColor: colors.primary,
  progressSize: 5,

  errorSnackbar: {
    fontSize: '36px',
    fontFamily: fonts.secondary
  }
};

export const TRANSITION_ENTER_TIMEOUT = 2000;
export const TRANSITION_EXIT_TIMEOUT = 2000;
