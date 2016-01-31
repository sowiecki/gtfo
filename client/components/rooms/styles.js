import { colors } from '../common/styles';

const { GREY, GREEN, BLUE, ORANGE, RED } = colors;

export default {
  officeLayoutContainer: {
    margin: 'auto auto',
    height: '100%',
    width: '100%',
    textAlign: 'center'
  },

  // NOTE this doesn't work yet, use SASS to style SVG
  // svg: {
  //   margin: 0,
  //   height: '96%',
  //   width: '46%',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   backgroundImage: 'url(../assets/layout.svg)',
  //   '@media (max-aspect-ratio: 6/4)': {
  //     height: '92%',
  //     width: '60%'
  //   }
  // },

  svgStroke: '#BBBBBB',

  OFFLINE: GREY,

  BOOKED: BLUE,

  VACANT: GREEN,

  ONE_MINUTE_WARNING: RED,

  FIVE_MINUTE_WARNING: ORANGE
};
