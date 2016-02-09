import { colors, breakpoints } from '../common/styles';

const { GREY, GREEN, BLUE, ORANGE, RED } = colors;

export const styles = {
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
      top: '85px',
      left: '50%',
      marginRight: '50%',
      transform: 'translate(-50%, 0)',
      width: '500px',
      height: '576px',
      backgroundSize: 'fill'
    },

    mediaQueries: {
      [breakpoints.widescreen]: {
        'img.office-layout, svg.office-layout': {
          width: '700px',
          height: '806px'
        }
      },

      [breakpoints.afterMedium]: {
        'img.office-layout, svg.office-layout': {
          width: '600px',
          height: '691px'
        }
      },

      [breakpoints.afterLarge]: {
        'img.office-layout, svg.office-layout': {
          width: '700px',
          height: '806px'
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

  meetingRoom: {
    'text.room-text': {
      zIndex: '200',
      fontSize: '14px',
      fontFamily: `'Wire One', sans-serif`,
      fontVariantCaps: 'all-small-caps'
    },

    mediaQueries: {
      [breakpoints.beforeMedium]: {
        'text.room-text': {
          transform: 'translateY(-10px)'
        }
      },

      [breakpoints.afterMedium]: {
        'text.room-text': {
          fontSize: '16px'
        }
      },

      [breakpoints.afterLarge]: {
        'text.room-text': {
          top: '20px',
          fontSize: '22px',
          lineHeight: '200'
        }
      }
    }
  }
};

export const TEXT_DX = 2;
export const TEXT_DY = 24;
// export const TEXT_DY_LARGE = 32; // TODO use with a width watcher
