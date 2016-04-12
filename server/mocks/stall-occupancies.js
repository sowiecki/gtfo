import { formatStallsResponse } from '../utils';

const mockStallOccupancies = {
  statuses: {
    51: {
      Men: {
        spaces: {
          'stall 1': {
            occupied: true
          },
          'stall 2': {
            occupied: false
          }
        }
      }
    }
  }
};

const getMockStallOcuppancies = () => formatStallsResponse(mockStallOccupancies);

export default getMockStallOcuppancies;
