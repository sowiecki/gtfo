/* eslint no-magic-numbers:0 */
import { colors, fonts, breakpoints, devices } from '../../common/styles';
import { genWidthAndHeight } from '../../../utils';

const layoutSelectors = [
  '.office-background',
  'svg.office-layout',
  '.office-layout-container'
].join(', ');

const svgLabelBaseTransform = 'rotate(45deg)';

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

    '.office-layout': {
      position: 'absolute',
      top: 0
    },

    '.office-background': {
      position: 'absolute',
      height: '100%'
    },

    'text.room-text, text.temperature-text': {
      zIndex: 200,
      fontSize: '6px',
      fontFamily: fonts.quaternary,
      fontWeight: 400,
      textShadow: `${colors.GREY} 0px 0px 0px`,
      textTransform: 'uppercase',
      transform: `${svgLabelBaseTransform} translate(3px, -17px)`
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
      transform: 'translateY(-24px)'
    },

    'text.restroom-marker': {
      transform: 'translateY(-20px)'
    },

    'svg.you-are-here > svg > path': {
      transform: 'scale(.5)'
    },

    'text.anchor-marker': {
      opacity: 0.5
    },

    '.map-legend-container': {
      bottom: '10px'
    },

    '.map-legend': {
      margin: '0 auto 0 28%',
      zoom: 0.6,
      width: '260px',
      backgroundColor: colors.WHITE,
      border: `1px solid ${colors.GREY}`
    },

    '.map-legend-icon': {
      transform: 'scale(.35)'
    },

    '.map-legend > div > div': {
      textShadow: `1px 1px 0 ${colors.WHITE}`
    },

    mediaQueries: {
      [breakpoints.afterSmall]: {
        /**
         * NOTE some of these settings tend to be overriden
         * by the portrait and iphone breakpoints below.
         */
        [layoutSelectors]: {
          top: '40px',
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

        '.map-legend-container': {
          top: '52px',
          left: '30%',
          bottom: 'auto'
        },

        '.map-legend': {
          margin: '0 auto 0 30%'
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
          margin: '0 auto 0 45%',
          zoom: 1
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
        },

        '.map-legend': {
          position: 'absolute',
          top: '20px',
          zoom: 2
        }
      },

      [devices.iphone5]: {
        [layoutSelectors]: {
          ...genWidthAndHeight(300)
        },

        'text.room-text, text.temperature-text': {
          fontSize: '6px',
          transform: `${svgLabelBaseTransform} translate(4px, -22px)`
        },

        'text.temperature-text': {
          fontSize: '6px',
          transform: `${svgLabelBaseTransform} translate(8px, -34px)`
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

        '.map-legend-container': {
          position: 'absolute',
          top: 'auto',
          left: 0,
          width: '100%',
          textAlign: '100%',
          bottom: '160px'
        },

        '.map-legend': {
          zoom: 0.9,
          margin: '0 auto',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0
        }
      }
    }
  }
};
