import { colors } from '../../common/styles';

export const ROOM_NAME_TEXT_DX = 2;
export const ROOM_NAME_TEXT_DY = 22;
export const ROOM_TEMPERATURE_TEXT_DX = 2;
export const ROOM_TEMPERATURE_TEXT_DY = 42;
export const MARKER_ROOM_NAME_TEXT_DY = ROOM_NAME_TEXT_DY + 16;

export const styles = {
  mapLegendContainer: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center'
  },

  mapLegendItem: {
    textAlign: 'left',
    padding: '4px 10px 10px 40px'
  },

  mapLegendIcon: {
    top: '-8px',
    left: '2px'
  },

  svgRect: {
    stroke: colors.GHOST_WHITE,
    strokeWidth: 1
  },

  svgRoomTextConnected: colors.DARK_BLUE,

  svgRoomTextDisconnected: colors.DARK_RED
};
