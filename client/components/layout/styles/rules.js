/* eslint no-magic-numbers:0 */
import { colors, fonts, breakpoints, devices } from '../../common/styles';

const layoutSelectors = [
  'image.office-background',
  'svg.office-layout',
  '.office-layout-container'
].join(', ');

const svgLabelBaseTransform = 'rotate(45deg)';

/**
 * Generates relative width and height CSS parameters.
 * @param {integer} width - Width value
 * @returns {object} Object with width and relative height properties.
 */
const genWidthAndHeight = (width) => ({
  height: `${width * 1.152}px`,
  width
});

export const rules = {
  officeLayout: {
    [layoutSelectors]: {
      top: '4px',
      display: 'block',
      overflow: 'hidden',
      ...genWidthAndHeight(345)
    },

    '.office-layout-container': {
      right: 0,
      left: 0,
      margin: 'auto auto'
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

    '.map-legend': {
      position: 'absolute',
      top: '-25px',
      left: '-50px',
      transform: 'scale(.25)',
      backgroundColor: colors.WHITE
    },

    mediaQueries: {
      [breakpoints.afterExtraSmall]: {
        [layoutSelectors]: {
          top: '30px',
          ...genWidthAndHeight(576)
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
        }
      },

      [breakpoints.afterSmall]: {
        [layoutSelectors]: {
          ...genWidthAndHeight(608)
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

      [breakpoints.afterLarge]: {
        [layoutSelectors]: {
          ...genWidthAndHeight(695)
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
          ...genWidthAndHeight(1000)
        },

        'text.room-text': {
          fontSize: '22px',
          transform: `${svgLabelBaseTransform} translate(12px, -16px)`
        },

        'text.restroom-marker': {
          fontSize: '38px',
          transform: 'translateY(28px)'
        }
      },

      [`${devices.iphone}, ${breakpoints.portrait}`]: {
        [layoutSelectors]: {
          ...genWidthAndHeight(350)
        },

        '.map-legend': {
          position: 'absolute',
          bottom: '-600px',
          left: '-210px',
          width: '566px',
          transform: 'scale(.25)'
        }
      },

      [devices.ipad]: {
        [layoutSelectors]: {
          top: '20px',
          ...genWidthAndHeight(690),
        },

        '.office-layout-container': {
          margin: 'auto 38px'
        },

        'text.room-text': {
          fontSize: '14px',
          transform: `${svgLabelBaseTransform} translate(6px, -18px)`
        },

        'text.marker-text': {
          fontSize: '12px',
          fontWeight: 'bold',
          transform: 'translateY(-8px)'
        },

        'text.restroom-marker': {
          fontSize: '22px',
          transform: 'translateY(-8px)'
        },

        '.map-legend': {
          zIndex: 0,
          bottom: '-2250px',
          left: '-80px',
          transform: 'scale(.5)'
        }
      }
    }
  }
};
