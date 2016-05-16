/* eslint no-magic-numbers:0 */
import { colors, fonts, breakpoints, devices } from '../../common/styles';

const layoutSelectors = [
  'image.office-background',
  'svg.office-layout',
  '.office-layout-container'
].join(', ');

const svgLabelBaseTransform = 'rotate(45deg)';

export const rules = {
  officeLayout: {
    [layoutSelectors]: {
      zIndex: 0,
      top: '4px',
      display: 'block',
      width: '300px',
      height: '345px',
      overflow: 'hidden'
    },

    'image.office-background': {
      position: 'absolute',
      backgroundSize: 'fill'
    },

    'text.room-text, text.temperature-text': {
      zIndex: 200,
      fontSize: '6px',
      fontFamily: fonts.quaternary,
      fontWeight: 400,
      textShadow: `${colors.GREY} 0px 0px 0px`,
      textTransform: 'uppercase',
      transform: `${svgLabelBaseTransform} translate(3px, -21px)`
    },

    'text.temperature-text': {
      fontSize: '4px',
      fontFamily: fonts.secondary,
      opacity: 0.85,
      transform: `${svgLabelBaseTransform} translate(10px, -34px)`
    },

    'text.marker-text': {
      fontSize: '12px',
      fontWeight: 'bold',
      transform: 'translateY(-20px)'
    },

    'svg.you-are-here > svg > path': {
      transform: 'scale(.5)'
    },

    'text.anchor-marker': {
      opacity: 0.5
    },

    'text.restroom-marker': {
      position: 'absolute',
      fontSize: '10px',
      fill: colors.DARK_GREY
    },

    mediaQueries: {
      [breakpoints.afterExtraSmall]: {
        [layoutSelectors]: {
          top: '30px',
          width: '500px',
          height: '576px'
        },

        'text.room-text, text.temperature-text': {
          fontSize: '10px',
          transform: `${svgLabelBaseTransform} translate(6px, -20px)`
        },

        'text.temperature-text': {
          fontSize: '8px',
          transform: `${svgLabelBaseTransform} translate(16px, -28px)`
        },

        'text.marker-text': {
          transform: 'translateY(-4px)'
        },

        'text.restroom-marker': {
          fontSize: '20px'
        },

        'svg.you-are-here > svg > path': {
          transform: 'translateX(-4px) scale(1)'
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

        'text.marker-text': {
          fontSize: '18px',
          transform: 'translateY(0)'
        },

        'svg.you-are-here > svg > path': {
          transform: 'translateX(0)'
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
