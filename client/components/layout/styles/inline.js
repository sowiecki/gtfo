import { colors } from '../../common/styles';
import { OCCUPIED,
         SQUATTED,
         VACANT,
         FIVE_MINUTE_WARNING,
         ONE_MINUTE_WARNING,
         BOOKED,
         OFFLINE,
         PINGED } from '../../../constants';

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

  locationHighlight: {
    height: '24px',
    width: '24px',
    x: '24px',
    y: '0'
  },

  mapLegendItem: {
    textAlign: 'left',
    fontSize: '40px'
  },

  placeMarker: {
    fill: colors.primary
  },

  svgStroke: colors.BLACK,

  svgStrokeWidth: 2,

  [OCCUPIED]: colors.RED,

  [SQUATTED]: colors.TEAL,

  [VACANT]: colors.GREEN,

  [ONE_MINUTE_WARNING]: colors.RED,

  [FIVE_MINUTE_WARNING]: colors.ORANGE,

  [BOOKED]: colors.BLUE,

  [OFFLINE]: colors.GREY,

  [PINGED]: colors.YELLOW
};
