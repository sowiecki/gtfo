/* eslint no-magic-numbers:0 */
import { colors, fonts, breakpoints, devices } from '../../common/styles';

export const ROOM_NAME_TEXT_DX = 2;
export const ROOM_NAME_TEXT_DY = 24;
export const ROOM_NAME_TSPAN_DY = '1.2em';
export const ROOM_TEMPERATURE_TEXT_DX = 2;
export const ROOM_TEMPERATURE_TEXT_DY = 42;
export const MARKER_ROOM_NAME_TEXT_DY = ROOM_NAME_TEXT_DY + 16;

const layoutSelectors = [
  'image.office-background',
  'svg.office-layout',
  '.office-layout-container'
].join(', ');

const svgLabelBaseTransform = 'rotate(45deg)';

export const rules = {
  officeLayout: {
    'image.office-background': {
      zIndex: 0,
      display: 'block',
      position: 'absolute',
      top: '30px',
      width: '300px',
      height: '345px',
      overflow: 'hidden',
      backgroundSize: 'fill'
    },

    'text.room-text, text.temperature-text': {
      zIndex: 200,
      fontSize: '10px',
      fontFamily: fonts.quaternary,
      fontWeight: 400,
      textShadow: `${colors.GREY} 0px 0px 0px`,
      textTransform: 'uppercase',
      transform: `${svgLabelBaseTransform} translate(6px, -20px)`
    },

    'text.temperature-text': {
      fontSize: '8px',
      fontFamily: fonts.secondary,
      opacity: 0.85,
      transform: `${svgLabelBaseTransform} translate(16px, -28px)`
    },

    'text.marker-text': {
      fontSize: '10px',
      fontWeight: 'bold',
      opacity: 0.5
    },

    'text.restroom-marker': {
      position: 'absolute',
      fontSize: '20px',
      fill: colors.DARK_GREY
    },

    mediaQueries: {
      [breakpoints.afterExtraSmall]: {
        [layoutSelectors]: {
          width: '500px',
          height: '576px'
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
          fontSize: '12px',
          transform: `${svgLabelBaseTransform} translate(8px, -18px)`
        },

        '.map-legend': {
          left: 'auto',
          right: 0,
          transform: 'scale(.35)'
        }
      },

      [breakpoints.afterMedium]: {
        [layoutSelectors]: {
          width: '608px',
          height: '700px'
        }
      },

      [breakpoints.afterLarge]: {
        [layoutSelectors]: {
          width: '695px',
          height: '800px'
        },

        'text.room-text': {
          fontSize: '14px',
        },

        'text.temperature-text': {
          fontSize: '12px',
          transform: `${svgLabelBaseTransform} translate(22px, -22px)`
        },

        '.map-legend': {
          top: '25px',
          left: '25px',
          right: 'auto',
          transform: 'scale(.5)'
        },

        'text.restroom-marker': {
          fontSize: '30px',
          transform: 'translateY(8px)'
        }
      },

      [breakpoints.afterExtraLarge]: {
        [layoutSelectors]: {
          width: '1050px',
          height: '1209px'
        },

        'text.room-text': {
          fontSize: '28px',
        },

        'text.restroom-marker': {
          fontSize: '40px',
          transform: 'translateY(28px)'
        }
      },

      [`${devices.iphone}, ${breakpoints.portrait}`]: {
        [layoutSelectors]: {
          top: '100px',
          width: '908px',
          height: '1046px'
        },

        'text.room-text': {
          fontSize: '18px',
          transform: `${svgLabelBaseTransform} translate(12px, -16px)`
        },

        'text.temperature-text': {
          fontSize: '12px',
          transform: `${svgLabelBaseTransform} translate(28px, -20px)`
        },

        '.map-legend': {
          transform: 'scale(.5)'
        }
      }
    }
  }
};
