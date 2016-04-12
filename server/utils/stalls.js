import { SQUATTED, VACANT } from '../constants';

/**
 * Formats response from stalls API. Returns response if given as array.
 * Example of post-transformation output
 * [
 *   { id: 'menStall1', alert: SQUATTED, location: 'duna-3' },
 *   { id: 'menStall2', alert: VACANT, location: 'duna-3' }
 * ];
 *
 * @param {object | array} stalls Collection of stalls response.
 * @returns {array} Original array or object reformatted into array.
 */
export const formatStallsResponse = (stalls) => {
  if (Array.isArray(stalls)) {
    return stalls;
  }

  // Will be used if stalls have no location key.
  const DEFAULT_LOCATION = require('../environment').devices[0].location;

  const formatSpace = (space) => {
    const firstChar = space.charAt(0).toUpperCase();
    const rest = space.slice(1);

    return `${firstChar}${rest}`.replace(/ /g, '');
  };

  const formattedStalls = [];

  const floors = stalls.statuses;

  Object.keys(floors).forEach((floor) => {
    const types = floors[floor];

    Object.keys(types).forEach((type) => {
      const spaces = types[type].spaces;

      Object.keys(spaces).forEach((space) => {
        const isOccupied = spaces[space].occupied;

        formattedStalls.push({
          id: `${type.toLowerCase()}${formatSpace(space)}`,
          alert: isOccupied ? SQUATTED : VACANT,
          location: spaces[space].location || DEFAULT_LOCATION
        });
      });
    });
  });

  return formattedStalls;
};
