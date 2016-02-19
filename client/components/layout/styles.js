import { colors, breakpoints } from '../common/styles';

const { GREY, GREEN, BLUE, ORANGE, RED } = colors;

export const styles = {
  paperOverride: {
    height: '100%'
  },

  swipableOverride: {
    overflowY: 'auto',
    height: '100%'
  },

  svgStroke: '#BBBBBB',

  OFFLINE: GREY,

  BOOKED: BLUE,

  VACANT: GREEN,

  ONE_MINUTE_WARNING: RED,

  FIVE_MINUTE_WARNING: ORANGE
};

export const rules = {
  officeLayout: {
    'img.office-layout, svg.office-layout': {
      position: 'absolute',
      top: '30px',
      left: '50%',
      marginRight: '50%',
      transform: 'translate(-50%, 0)',
      width: '300px',
      height: '345px',
      overflow: 'hidden',
      backgroundSize: 'fill'
    },

    mediaQueries: {
      [breakpoints.afterExtraSmall]: {
        'img.office-layout, svg.office-layout': {
          width: '500px',
          height: '576px'
        }
      },

      [breakpoints.afterSmall]: {
        'img.office-layout, svg.office-layout': {
          width: '608px',
          height: '700px'
        }
      },

      [breakpoints.afterMedium]: {
        'img.office-layout, svg.office-layout': {
          width: '608px',
          height: '700px'
        }
      },

      [breakpoints.afterLarge]: {
        'img.office-layout, svg.office-layout': {
          width: '695px',
          height: '800px'
        }
      },

      [breakpoints.afterExtraLarge]: {
        'img.office-layout, svg.office-layout': {
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
