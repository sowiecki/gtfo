/* eslint no-console:0 */
/* globals console */
import { filter, map } from 'lodash';
import { uniq, get } from 'lodash';
import slug from 'slug';

import history from '../config/history';
import { getBackdropErrorMessage } from './errors';

const DEFAULT_LOCATION = 'sears-tower-251'; // TODO better default handling

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
    console.log(getBackdropErrorMessage(location));
  }
};

/**
 * TODO replace all uses of this with LocationDescriptor
 * https://github.com/mjackson/history/blob/master/docs/Glossary.md#locationdescriptor
 * Constructs and pushes new route to history API.
 * @param {string} newLocation New location to push to routes.
 * @param {string} Parameter identifying anchors.
 * @returns {undefined}
 */
export const updateLocationIndex = (newLocation, anchorId) => {
  const anchor = anchorId ? `?anchor=${anchorId}` : '';

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
 * Filters array of objects (rooms, markers) by location property.
 * @param {array} collection Collection of room or marker objects
 * @param {string} location Location to filter for.
 * @returns {array} Collection of only rooms or markers from specified location.
 */
export const filterByLocation = (collection, location) => {
  if (!location) {
    /**
     * I would use default parameters here, but Travis CI freaks out on it.
     */
    location = DEFAULT_LOCATION;
  }

  return filter(collection, (room) => location === slug(room.location, { lower: true }));
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
export const pluckLocations = (rooms) => uniq(map(rooms, 'location'));

/**
 * DEPRECATED
 * Gets anchor from state store.
 * @param {object} store State store.
 * @returns {string} Parsed anchor parameter.
 */
export const getAnchorFromStore = (store) => {
  const anchor = get(store.getState(), 'routeReducer.location.query.anchor', '');

  return anchor;
};

/**
 * Checks if anchor query parameter exists.
 * @param {object} Query params.
 * @returns {bool} True is query anchor is defined.
 */
export const hasAnchor = ({ query }) => {
  const anchor = get(query, 'anchor', '');

  return !!anchor;
};

/**
 * Checks if provided marker represents provided location anchor.
 * @param {object} marker Marker object.
 * @param {object} location Location object.
 * @returns {bool} Parsed anchor parameter.
 */
export const youAreHere = (marker, location) => {
  const anchor = get(location, 'query.anchor', '');
  const markerName = slug(marker.name, { lower: true });

  return anchor === markerName;
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
