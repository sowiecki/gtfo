/* eslint no-magic-numbers:0 */
import { colors, fonts, breakpoints, devices } from '../common/styles';

export const styles = {
  paperOverride: {
    height: '100%'
  },

  swipableOverride: {
    overflowY: 'scroll',
    height: '100%',
    width: '100%'
  },

  officeLayoutContainer: {
    right: '0',
    left: '0',
    margin: 'auto auto'
  },

  locationHighlight: {
    height: '24px',
    width: '24px',
    x: '24px',
    y: '0'
  },

  mapLegendItem: {
    textAlign: 'left',
    fontSize: '40px'
  },

  placeMarker: {
    fill: colors.primary
  },

  svgStroke: colors.GREY,

  OFFLINE: colors.GREY,

  BOOKED: colors.BLUE,

  VACANT: colors.GREEN,

  ONE_MINUTE_WARNING: colors.RED,

  FIVE_MINUTE_WARNING: colors.ORANGE,

  PINGED: colors.YELLOW
};

const layoutSelectors = [
  'img.office-layout',
  'svg.office-layout',
  '.office-layout-container'
].join(', ');

export const rules = {
  officeLayout: {

    'img.office-layout, svg.office-layout': {
      display: 'block',
      position: 'absolute',
      top: '30px',
      width: '300px',
      height: '345px',
      overflow: 'hidden',
      backgroundSize: 'fill'
    },

    'text.room-text': {
      zIndex: '200',
      fontSize: '10px',
      fontFamily: fonts.primary,
      fontWeight: 'bold',
      textShadow: `${colors.GREY} 0px 0px 0px`
    },

    'text.marker-text': {
      fontSize: '14px',
      fontWeight: 'bold',
      opacity: 0.5
    },

    mediaQueries: {
      [breakpoints.afterExtraSmall]: {
        [layoutSelectors]: {
          width: '500px',
          height: '576px'
        },

        'text.room-text': {
          fontSize: '15px'
        },

        '.map-legend': {
          position: 'absolute',
          top: '-25px',
          left: '-50px',
          transform: 'scale(.25)',
          backgroundColor: 'rgba(255, 255, 255, .25)'
        }
      },

      [breakpoints.afterSmall]: {
        [layoutSelectors]: {
          width: '608px',
          height: '700px'
        },

        'text.room-text': {
          fontSize: '18px',
          transform: 'translateY(2px)'
        },

        '.map-legend': {
          left: 'auto',
          right: '0',
          transform: 'scale(.35)'
        }
      },

      [breakpoints.afterMedium]: {
        [layoutSelectors]: {
          width: '608px',
          height: '700px'
        },

        'text.room-text': {
          transform: 'translateY(4px)'
        }
      },

      [breakpoints.afterLarge]: {
        [layoutSelectors]: {
          width: '695px',
          height: '800px'
        },

        'text.room-text': {
          fontSize: '22px',
          transform: 'translateY(8px)'
        },

        '.map-legend': {
          top: '25px',
          left: '25px',
          right: 'auto',
          transform: 'scale(.5)'
        }
      },

      [breakpoints.afterExtraLarge]: {
        [layoutSelectors]: {
          width: '1050px',
          height: '1209px'
        }
      },

      [devices.iphone]: {
        [layoutSelectors]: {
          width: '908px',
          height: '1046px'
        },

        '.map-legend': {
          transform: 'scale(.5)'
        }
      },

      [breakpoints.portrait]: {
        [layoutSelectors]: {
          top: '100px'
        }
      }
    }
  }
};

export const TEXT_DX = 2;
export const TEXT_DY = 24;
export const MARKER_TEXT_DY = TEXT_DY + 16;
