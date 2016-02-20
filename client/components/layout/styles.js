import { colors, breakpoints, devices } from '../common/styles';

const { GREY, GREEN, BLUE, ORANGE, RED } = colors;

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

  svgStroke: '#BBBBBB',

  OFFLINE: GREY,

  BOOKED: BLUE,

  VACANT: GREEN,

  ONE_MINUTE_WARNING: RED,

  FIVE_MINUTE_WARNING: ORANGE
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

    mediaQueries: {
      [devices.iphone]: {
        [layoutSelectors]: {
          width: '908px',
          height: '1046px'
        }
      },

      [breakpoints.portrait]: {
        [layoutSelectors]: {
          top: '100px'
        }
      },

      [breakpoints.afterExtraSmall]: {
        [layoutSelectors]: {
          width: '500px',
          height: '576px'
        }
      },

      [breakpoints.afterSmall]: {
        [layoutSelectors]: {
          width: '608px',
          height: '700px'
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
        }
      },

      [breakpoints.afterExtraLarge]: {
        [layoutSelectors]: {
          width: '1050px',
          height: '1209px'
        }
      }
    }
  },

  roomText: {
    'text.room-text': {
      zIndex: '200',
      fontSize: '10px',
      fontFamily: `'Wire One', sans-serif`,
      fontWeight: 'bold',
      fontVariantCaps: 'all-small-caps',
      transform: 'translateY(-10px)'
    },

    mediaQueries: {
      [breakpoints.afterExtraSmall]: {
        'text.room-text': {
          fontSize: '15px'
        }
      },

      [breakpoints.afterSmall]: {
        'text.room-text': {
          fontSize: '18px',
          transform: 'translateY(2px)'
        }
      },

      [breakpoints.afterMedium]: {
        'text.room-text': {
          transform: 'translateY(4px)'
        }
      },

      [breakpoints.afterLarge]: {
        'text.room-text': {
          fontSize: '22px',
          transform: 'translateY(8px)'
        }
      }
    }
  }
};

export const TEXT_DX = 2;
export const TEXT_DY = 24;
// export const TEXT_DY_LARGE = 32; // TODO use with a width watcher
