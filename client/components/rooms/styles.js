import { colors, breakpoints } from '../common/styles';

const { GREY, GREEN, BLUE, ORANGE, RED } = colors;

export const styles = {
  officeLayoutContainer: {
    margin: 'auto auto',
    height: '100%',
    width: '100%',
    textAlign: 'center'
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
    'svg.office-layout': {
      position: 'relative',
      top: '65px',
      left: '-200px',
      height: '850px',
      width: '850px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: require('../../assets/layout.svg')
    },

    mediaQueries: {
      [breakpoints.afterMedium]: {
        'svg.office-layout': {
          left: '-100px',
          height: '1000px',
          width: '1000px'
        }
      },

      [breakpoints.afterLarge]: {
        'svg.office-layout': {
          height: '1500px',
          width: '1500px'
        }
      }
    }
  },

  roomText: {
    'text.room-text': {
      fontSize: '10px',
      fontFamily: `'Titillium Web', sans-serif`
    },

    mediaQueries: {
      [breakpoints.beforeMedium]: {
        'text.room-text': {
          transform: 'translateY(-10px)'
        }
      },

      [breakpoints.afterMedium]: {
        'text.room-text': {
          fontSize: '11px'
        }
      },

      [breakpoints.afterLarge]: {
        'text.room-text': {
          fontSize: '12px'
        }
      }
    }
  }
};
