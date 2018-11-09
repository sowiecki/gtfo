/**
 * For status colors,
 * please refer to universal/constants/status-colors
 */
export const colors = {
  primary: '#01E0F3',
  secondary: '#2591E2',
  primaryOpposing: '#FFAE00',
  secondaryOpposing: '',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GHOST_WHITE: '#F8F8FF',
  GREY: '#5A5A66',
  LIGHT_GREY: '#C3C3C3',
  DARK_GREY: '#333333',
  DARK_RED: '#770000',
  DARK_BLUE: '#002277'
};

export const fonts = {
  primary: '\'Wire One\', sans-serif',
  secondary: '\'Titillium Web\', sans-serif',
  tertiary: '\'Roboto\', Arial, sans-serif',
  quaternary: '\'Yanone Kaffeesatz\', sans-serif'
};

export const fontStyles = {
  primary: `
    font-family: ${fonts.tertiary};
    color: ${colors.LIGHT_GREY};
  `,
  secondary: `
    font-family: ${fonts.secondary};
    color: ${colors.LIGHT_GREY};
  `,
  tertiary: `
    font-family: ${fonts.tertiary};
    color: ${colors.LIGHT_GREY};
  `,
  quaternary: `
    font-family: ${fonts.quaternary};
    color: ${colors.LIGHT_GREY};
  `
};

export const MOBILE_WIDTH_BREAKPOINT = 511;

export const breakpoints = {
  // mobile_iphone5: `
  //   @media (screen and (min-device-width: 320px)
  //     and (max-device-width: 568px)
  //     and (-webkit-min-device-pixel-ratio: 2))
  // `,
  // mobile_ipad: `
  //   @media (screen and (min-device-width: 768px)
  //     and (max-device-width: 1024px)
  //     and (-webkit-min-device-pixel-ratio: 2)
  // `,
  mobile_iphone5: '@media screen and (max-width: 320px)',
  mobile: '@media screen and (max-width: 511px)',
  tablet: '@media screen and (min-width: 1023px) and (orientation: portrait)',
  large: '@media screen and (min-width: 2048px)'
};

// beforeSmall: 'screen and (max-width: 719px)',
// beforeMedium: 'screen and (max-width: 1023px)',
// afterExtraSmall: 'screen and (min-width: 512px)',
// afterSmall: 'screen and (min-width: 720px)',
// afterMedium: 'screen and (min-width: 1024px)',
// afterLarge: 'screen and (min-width: 1500px)',
// afterExtraLarge: 'screen and (min-width: 2048px)',
// widescreen: 'screen and (min-aspect-ratio: 16/10)',
// portrait: 'screen and (orientation: portrait)'
