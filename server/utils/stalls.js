import { STALL_TYPES, SQUATTED, VACANT } from '../constants';

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

  const formatSpace = (space) => {
    const firstChar = space.charAt(0).toUpperCase();
    const rest = space.slice(1);

    return `${firstChar}${rest}`.replace(/ /g, '');
  };

  const formattedStalls = [];

  const { statuses } = stalls;

  Object.keys(statuses).forEach((status) => {
    const floor = statuses[status];
    const location = floor.Location;

    Object.keys(floor).forEach((prop) => {
      if (!STALL_TYPES.includes(prop)) {
        return;
      }

      const { spaces } = floor[prop];

      Object.keys(spaces).forEach((space) => {
        const { occupied, active } = spaces[space];

        formattedStalls.push({
          id: `${prop.toLowerCase()}${formatSpace(space)}`,
          alert: occupied ? SQUATTED : VACANT,
          location,
          active
        });
      });
    });
  });

  return formattedStalls;
};
