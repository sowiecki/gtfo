import { colors } from '../../common/styles';
import { getLocationBackdrop } from '../../../utils';

export const styles = {
  generateOfficeBackgroundStyle: (location) => ({
    backgroundImage: `url(${getLocationBackdrop(location)})`,
    backgroundSize: '100%'
  }),

  paperOverride: {
    height: '100%'
  },

  swipableOverride: {
    overflowY: 'scroll',
    height: '100%',
    width: '100%'
  },

  officeLayoutContainer: {
    right: 0,
    left: 0,
    margin: 'auto auto'
  },

  locationHighlight: {
    height: '24px',
    width: '24px',
    x: '24px',
    y: 0
  },

  mapLegendItem: {
    textAlign: 'left',
    fontSize: '40px'
  },

  placeMarker: {
    fill: colors.primary
  },

  svgRect: {
    stroke: colors.DARK_GREY,
    strokeWidth: 2
  }
};
