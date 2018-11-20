/* eslint-env node, jest */
import expect from 'expect';

import { formatStallsResponse } from 'server/utils';
import { SQUATTED, VACANT } from 'server/constants';

describe('Stalls utilities (server)', () => {
  const mockStallsArray = [
    { id: 'menstall1', active: true, alert: SQUATTED, location: 'duna-3' },
    { id: 'menstall2', active: false, alert: VACANT, location: 'duna-3' },
    { id: 'womenstall1', active: false, alert: VACANT, location: 'duna-3' },
    { id: 'womenstall2', active: true, alert: VACANT, location: 'duna-3' }
  ];

  const mockStallsObject = {
    statuses: {
      51: {
        Location: {
          meta: true,
          name: 'duna-3'
        },
        Men: {
          spaces: {
            'stall 1': {
              active: true,
              occupied: true
            },
            'stall 2': {
              active: false,
              handicapped: true,
              occupied: false
            }
          }
        },
        Women: {
          spaces: {
            'stall 1': {
              active: false,
              occupied: false
            },
            'stall 2': {
              active: true,
              occupied: false
            }
          }
        }
      }
    }
  };

  describe('formatStallsResponse', () => {
    it('should format a stalls response object into desired format', () => {
      expect(formatStallsResponse(mockStallsObject)).toEqual(mockStallsArray);
    });

    it('should pass through a stalls response array with no modification', () => {
      expect(formatStallsResponse(mockStallsArray)).toEqual(mockStallsArray);
    });
  });
});
