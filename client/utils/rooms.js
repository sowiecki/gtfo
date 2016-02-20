/* eslint no-console:0 */
/* globals console */
import { filter, pluck } from 'lodash/collection';
import uniq from 'lodash/array/uniq';
import get from 'lodash/object/get';
import slug from 'slug';

import history from '../config/history';
import { ANCHOR_PATH_REGEX } from '../constants/urls';

const DEFAULT_LOCATION = slug('Two Prudential 51'); // TODO better default handling

/**
 * Imports and assigns corresponding backdrop for room.
 * @param {string} location Name of relevant location.
 * @returns {string} Path of location backdrop asset.
 */
export const getLocationBackdrop = (location) => {
  const backdrops = require.context('../assets/', true, /^\.\/.*\.png$/);

  try {
    return backdrops(`./${location}.png`);
  } catch (e) {
    const errorMessage = `Failed to backdrop for ${location}.
      Make sure it's correctly saved in /client/assets/`;
    console.log(errorMessage);
  }
};

/**
 * Constructs and pushes new route to history API.
 * @param {string} newLocation New location to push to routes.
 * @param {string} Parameter identifying anchors.
 * @returns {undefined}
 */
export const updateLocationIndex = (newLocation, anchorId) => {
  const anchor = anchorId ? `/anchor/${anchorId}` : '';

  history.push(`/${newLocation}${anchor}`);
};

/**
 * Gets pathname from location parameter.
 * @param {object} location Location parameter.
 * @returns {string} Parsed pathname.
 */
export const getPathname = (location) => {
  const pathname = get(location, 'pathname', DEFAULT_LOCATION);

  return pathname;
};

/**
 * Filters rooms by location.
 * @param {array} rooms Collection of room objects
 * @param {string} location Location to filter for.
 * @returns {array} Collection of only rooms from specified location.
 */
export const filterRoomsByLocation = (rooms, location = DEFAULT_LOCATION) => {
  return filter(rooms, (room) => location === slug(room.location, { lower: true }));
};

/**
 * Converts slug to the appropriate formatting for displaying proper nouns.
 * @param {string} name Name in hyphenated slug form.
 * @returns {string} Formatted name.
 */
export const formatForDisplay = (name) => {
  return name.split(/-/).map((word) => {
    const firstCharacter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);

    return `${firstCharacter}${restOfWord}`;
  }).join(' ');
};

/**
 * Plucks locations from a collection of rooms.
 * @param {array} rooms Collection of room objects.
 * @returns {array} Collection of location strings.
 */
export const pluckLocations = (rooms) => {
  return uniq(pluck(rooms, 'location'));
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
