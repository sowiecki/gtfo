import { SQUATTED, VACANT } from '../constants';

/**
 * Example of post-transformation output
 * const getMockStallOcuppancies = () => (
 *   [
 *     { id: 'menStall1', alert: SQUATTED, location: 'two-prudential-51' },
 *     { id: 'menStall2', alert: VACANT, location: 'two-prudential-51' }
 *   ]
 * );
 */

const mockStallOccupancies = {
  statuses: {
    51: {
      Men: {
        spaces: {
          'stall 1': {
            occupied: true,
            location: 'two-prudential-51'
          },
          'stall 2': {
            occupied: false,
            location: 'two-prudential-51'
          }
        }
      }
    }
  }
};

const formatSpace = (space) => {
  const firstChar = space.charAt(0).toUpperCase();
  const rest = space.slice(1);

  return `${firstChar}${rest}`.replace(/ /g, '');
};

// TODO move to utils once prod is ready
const transformStallOccupancies = (stallOccupancies) => {
  const stalls = [];

  const floors = stallOccupancies.statuses;

  Object.keys(floors).forEach((floor) => {
    const types = floors[floor];

    Object.keys(types).forEach((type) => {
      const spaces = types[type].spaces;

      Object.keys(spaces).forEach((space) => {
        const isOccupied = spaces[space].occupied;

        stalls.push({
          id: `${type.toLowerCase()}${formatSpace(space)}`,
          alert: isOccupied ? SQUATTED : VACANT,
          location: spaces[space].location || 'two-prudential-51' // TODO remove
        });
      });
    });
  });

  return stalls;
};

const getMockStallOcuppancies = () => transformStallOccupancies(mockStallOccupancies);

export default getMockStallOcuppancies;
