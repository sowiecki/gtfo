import { formatStallsResponse } from '../utils';
import { devices } from '../../environment';

const mockStallOccupancies = {
  statuses: {
    [devices[0].location.match(/[0-9]/g).join('')]: {
      Location: {
        name: devices[0].location.toLowerCase().replace(/ /g, '-')
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
