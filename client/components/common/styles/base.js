/**
 * For status colors,
 * please refer to universal/constants/status-colors
 */
export const colors = {
  primary: '#0072C8',
  secondary: '#2591E2',
  primaryOpposing: '#FFAE00',
  secondaryOpposing: '',
  WHITE: '#FFFFFF',
  GHOST_WHITE: '#F8F8FF',
  GREY: '#888899',
  DARK_GREY: '#333333'
};

export const fonts = {
  primary: '\'Wire One\', sans-serif',
  secondary: '\'Titillium Web\', sans-serif',
  tertiary: '\'Roboto\', Arial, sans-serif',
  quaternary: '\'Yanone Kaffeesatz\', sans-serif'
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
           and (-webkit-min-device-pixel-ratio: 2)`,
  ipad: `screen and (min-device-width: 768px)
         and (max-device-width: 1024px)
         and (-webkit-min-device-pixel-ratio: 2)`
};
