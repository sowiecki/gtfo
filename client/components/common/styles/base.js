export const colors = {
  primary: '#0072C8',
  secondary: '#2591E2',
  primaryOpposing: '#FFAE00',
  secondaryOpposing: '',
  WHITE: '#FFFFFF',
  GHOST_WHITE: '#F8F8FF',
  GREY: '#888899',
  DARK_GREY: '#333333',
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
  primary: '\'Wire One\', sans-serif',
  secondary: '\'Titillium Web\', sans-serif'
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
