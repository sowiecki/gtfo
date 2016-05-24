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
      transform: 'translateY(-16px)'
    },

    'svg.you-are-here > svg > path': {
      transform: 'scale(.5)'
    },

    'text.anchor-marker': {
      opacity: 0.5
    },

    '.map-legend': {
      position: 'absolute',
      top: 0,
      bottom: '-220px',
      left: 0,
      width: '560px',
      transform: 'scale(.2)',
      backgroundColor: colors.WHITE
    },

    mediaQueries: {
      [breakpoints.afterSmall]: {
        [layoutSelectors]: {
          ...genWidthAndHeight(608)
        },

        'text.room-text': {
          fontSize: '12px',
          transform: `${svgLabelBaseTransform} translate(8px, -18px)`
        },

        'svg.you-are-here > svg > path': {
          transform: 'translateX(0)'
        },

        'text.marker-text': {
          fontSize: '24px',
          transform: 'translateY(0)'
        },

        '.map-legend': {
          position: 'absolute',
          top: '560px',
          bottom: '100px',
          height: '360px',
          transform: 'scale(.3)',
        }
      },

      [breakpoints.afterLarge]: {
        [layoutSelectors]: {
          ...genWidthAndHeight(695)
        },

        'text.room-text': {
          fontSize: '14px',
        },

        'text.marker-text, text.restroom-marker': {
          fontSize: '22px',
          transform: 'translateY(6px)'
        },

        'text.temperature-text': {
          fontSize: '12px',
          transform: `${svgLabelBaseTransform} translate(22px, -22px)`
        },

        '.map-legend': {
          position: 'absolute',
          top: '50px',
          bottom: '100px',
          height: '360px',
          transform: 'scale(.5)',
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

        'text.room-text, text.temperature-text': {
          fontSize: '7px',
          transform: `${svgLabelBaseTransform} translate(4px, -22px)`
        },

        'text.temperature-text': {
          fontSize: '6px',
          transform: `${svgLabelBaseTransform} translate(8px, -34px)`
        },

        '.map-legend': {
          position: 'absolute',
          bottom: '-760px',
          left: '-170px',
          width: '560px',
          transform: 'scale(.35)'
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

        'text.temperature-text': {
          fontSize: '12px',
          opacity: 0.5,
          transform: `${svgLabelBaseTransform} translate(16px, -26px)`
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
          top: '720px',
          bottom: 0,
          left: '-120px',
          transform: 'scale(.45)'
        }
      }
    }
  }
};
