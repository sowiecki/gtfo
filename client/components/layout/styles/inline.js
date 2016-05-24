import { colors } from '../../common/styles';
import { getLocationBackdrop } from '../../../utils';

export const ROOM_NAME_TEXT_DX = 2;
export const ROOM_NAME_TEXT_DY = 24;
export const ROOM_TEMPERATURE_TEXT_DX = 2;
export const ROOM_TEMPERATURE_TEXT_DY = 42;
export const MARKER_ROOM_NAME_TEXT_DY = ROOM_NAME_TEXT_DY + 16;

export const styles = {
  generateOfficeBackgroundStyle: (location) => ({
    backgroundImage: `url(${getLocationBackdrop(location)})`,
    backgroundSize: '100%'
  }),

  paperOverride: {
    height: '100%'
  },

  swipableOverride: {
    overflow: 'hidden',
    height: '100%',
    width: '100%'
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
