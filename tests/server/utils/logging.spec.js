/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';
import moment from 'moment';

import { genGuagePercentage, formatDurationForDisplay } from 'server/utils';

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

  describe('formatDurationForDisplay', () => {
    it('should correctly format a moment duration for display', () => {
      const testUnits = ['second', 'minute', 'hour', 'day'];
      const genFormat = (i) => ({
        second: `0 years 0 months 0 days 0 hours 0 minutes ${i} seconds`,
        minute: `0 years 0 months 0 days 0 hours ${i} minutes 0 seconds`,
        hour: `0 years 0 months 0 days ${i} hours 0 minutes 0 seconds`,
        day: `0 years 0 months ${i} days 0 hours 0 minutes 0 seconds`
      });
      const genTestUnit = (key, i) => genFormat(i)[key];

      testUnits.forEach((unit) => {
        const getMockTime = () => moment('12:00', 'HH:mm');
        const getDuration = (i) => getMockTime().diff(getMockTime().subtract(i, unit));
        const genDuration = (e, i) => moment.duration(getDuration(i));
        const mockDurations = new Array(10).fill('foo').map(genDuration);

        mockDurations.forEach((mockDuration, i) => {
          const result = formatDurationForDisplay(mockDuration);

          expect(result).toBe(genTestUnit(unit, i));
        });
      });
    });
  });
});
