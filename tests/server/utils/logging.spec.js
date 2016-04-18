/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import { genGuagePercentage } from 'server/utils';

describe('Logging utilities', () => {
  describe('genGuagePercentage', () => {
    const mockRooms = [
      {
        name: 'Kerbal',
        alert: 'BOOKED'
      },
      {
        name: 'Duna',
        alert: 'BOOKED'
      },
      {
        name: 'Jool',
        alert: 'VACANT'
      },
      {
        name: 'Laythe'
      }
    ];

    const expectedForBooked = {
      percent: 50,
      stroke: 'cyan'
    };

    const expectedForVacant = {
      percent: 25,
      stroke: 'green'
    };

    const expectedForOffline = {
      percent: 25,
      stroke: 'black'
    };

    it('should return parsed host name.', () => {
      expect(genGuagePercentage(mockRooms, 'BOOKED')).toEqual(expectedForBooked);
      expect(genGuagePercentage(mockRooms, 'VACANT')).toEqual(expectedForVacant);
      expect(genGuagePercentage(mockRooms, undefined)).toEqual(expectedForOffline);
    });
  });
});
