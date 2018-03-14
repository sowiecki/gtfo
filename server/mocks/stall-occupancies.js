import { formatStallsResponse } from '../utils';

const mockStallOccupancies = {
  statuses: {
    51: {
      Location: {
        name: 'two-prudential-51'
      },
      Men: {
        spaces: {
          'stall 1': {
            occupied: true,
            active: true
          },
          'stall 2': {
            occupied: false,
            active: false
          }
        }
      }
    }
  }
};

const getMockStallOcuppancies = () => formatStallsResponse(mockStallOccupancies);

export default getMockStallOcuppancies;
