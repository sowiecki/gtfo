/* eslint no-console:0 */
/* globals console */
import { filter, map, uniq, get } from 'lodash';
import slugify from 'slugify';
import queryString from 'query-string';

import { getBackdropErrorMessage } from './errors';

const DEFAULT_LOCATION = 'sears-tower-251'; // TODO better default handling

/**
 * Imports and assigns corresponding backdrop for room.
 * @param {string} location Name of relevant location.
 * @returns {string} Path of location backdrop asset.
 */
export const getLocationBackdrop = (location) => {
  // if (!location) return;

  const backdrops = require.context('../../environment/assets/', true, /^\.\/.*\.png$/);

  try {
    return backdrops(`./${location}.png`);
  } catch (e) {
    console.log(getBackdropErrorMessage(location));
  }
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

  return filter(collection, (prop) => {
    const propLocation = get(prop, 'location.name', prop.location);

    return location === slugify(propLocation).toLowerCase();
  });
};

/**
 * Converts slug to the appropriate formatting for displaying proper nouns.
 * @param {string} name Name in hyphenated slug form.
 * @returns {string} Formatted name.
 */
export const formatForDisplay = (name) =>
  name
    .split(/-/)
    .map((word) => {
      const firstCharacter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);

      return `${firstCharacter}${restOfWord}`;
    })
    .join(' ');

/**
 * Plucks locations from a collection of rooms.
 * @param {array} rooms Collection of room objects.
 * @returns {array} Collection of location strings.
 */
export const pluckLocations = (rooms) => uniq(map(rooms, 'location'));

/**
 * Checks if anchor query parameter exists.
 * @param {object} Query params.
 * @returns {bool} True is query anchor is defined.
 */
export const hasAnchor = ({ search }) => {
  const { anchor } = queryString.parse(search);

  return !!anchor;
};

/**
 * Checks if provided marker represents provided location anchor.
 * @param {object} marker Marker object.
 * @param {object} location Location object.
 * @returns {bool} Parsed anchor parameter.
 */
export const youAreHere = (marker, location) => {
  const { anchor } = queryString.parse(location.search);
  const markerName = slugify(marker.name).toLowerCase();

  return anchor === markerName;
};

/**
 * Generates relative width and height CSS parameters.
 * @param {integer} width - Width value
 * @returns {object} Object with width and relative height properties.
 */
export const genWidthAndHeight = (width) => ({
  height: `${Math.max(Math.ceil(width * 11.52) / 10, 2.8)}px`,
  width: `${width}px`
});

/**
 * Safety against initial location index being -1,
 * which causes ReactSwipeableViews to give an annoying console error.
 *
 * @param {array} locationKeys
 * @param {string} locationParam
 * @returns {integer}
 */
export const getLocationIndex = (locationKeys, location) => {
  const locationIndex = locationKeys.indexOf(location.pathname);

  return locationIndex >= 0 ? locationIndex : 0;
};
