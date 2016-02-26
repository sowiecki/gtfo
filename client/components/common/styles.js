import transitions from './transitions';

export const colors = {
  primary: '#0072C8',
  secondary: '#2591E2',
  primaryOpposing: '#FFAE00',
  secondaryOpposing: '',
  WHITE: '#FFFFFF',
  GHOST_WHITE: '#F8F8FF',
  GREY: '#888899',
  BLACK: '#333333',
  PURPLE: '#551A8B',
  BLUE: '#3399FF',
  TEAL: '#217C7E',
  DARK_PINK: '#FF0066',
  RED: '#FF0000',
  GREEN: '#72E837',
  ORANGE: '#FFBB00',
  YELLOW: '#FFFF00'
};

export const fonts = {
  primary: `'Wire One', sans-serif`,
  secondary: `'Titillium Web', sans-serif`
};

export const breakpoints = {
  beforeSmall: 'screen and (max-width: 719px)',
  beforeMedium: 'screen and (max-width: 1023px)',
  afterExtraSmall: 'screen and (min-width: 512px)',
  afterSmall: 'screen and (min-width: 720px)',
  afterMedium: 'screen and (min-width: 1024px)',
  afterLarge: 'screen and (min-width: 1500px)',
  afterExtraLarge: 'screen and (min-width: 2048px)',
  widescreen: 'screen and (min-aspect-ratio: 16/10)',
  portrait: 'screen and (orientation: portrait)'
};

export const devices = {
  iphone: `screen and (min-device-width: 320px)
           and (max-device-width: 568px)
           and (-webkit-min-device-pixel-ratio: 2)`
};

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

export const rules = {
  body: {
    'html, body, #root, #root > div': {
      margin: '0',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      textAlign: 'center',
      backgroundColor: colors.GHOST_WHITE
    },

    ...transitions
  },

  '*': {
    boxSizing: 'border-box'
  }
};

export const TRANSITION_ENTER_TIMEOUT = 2000;
export const TRANSITION_EXIT_TIMEOUT = 2000;
