import get from 'lodash/object/get';

import { ANCHOR_PATH_REGEX } from '../constants/urls';

/**
 * Gets pathname from location parameter.
 * @param {object} location Location parameter.
 * @returns {string} Parsed pathname.
 */
export const getPathname = (location) => {
  const { pathname } = location;

  return pathname.replace(/\//i, '');
};

/**
 * Gets anchor from state store.
 * @param {object} store State store.
 * @returns {string} Parsed anchor parameter.
 */
export const getAnchor = (store) => {
  const { pathname } = get(store.getState(), 'routeReducer.location');

  return pathname.replace(ANCHOR_PATH_REGEX, '');
};

/**
 * Formats room coordinate parameters for display in SVG element.
 * @param {object} coordinates Raw coordinates of room SVG element.
 * @returns {object} Formatted coordinates of room SVG element.
 */
export const shapeModifier = ({ height, width, x, y }) => {
  // height = 18.9;
  // width = 10;
  // x = 89.5;
  // y = 40.5;
  return {
    height: `${height}%`,
    width: `${width}%`,
    x: `${x}%`,
    y: `${y}%`
  };
};

/**
 * Maps pinged property to meeting room state, set to true is ping is intended for meeting room.
 * @param {object} state Meeting room state.
 * @param {object} ping Ping object.
 * @returns {object} Meeting room state with pinged parameter set to true.
 */
export const mapPing = (state, ping) => {
  return state.get('meetingRooms').map((meetingRoom) => {
    if (meetingRoom.id === ping.id) {
      meetingRoom.pinged = true;
    }
    return meetingRoom;
  });
};
