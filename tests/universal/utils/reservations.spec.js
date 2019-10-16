/* eslint-env node, jest */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';
import sinon from 'sinon';

import { filterExpiredReservations } from 'server/utils';

describe('Reservation utilities (universal)', () => {
  describe('filterExpiredReservations', () => {
    const clock = (time) =>
      sinon.useFakeTimers({
        now: Date.parse(time),
        toFake: ['Date']
      });

    beforeEach(() => {
      sinon.useFakeTimers().restore();
    });

    afterEach(() => {
      sinon.useFakeTimers().restore();
    });

    const mockReservations = [
      {
        start: {
          dateTime: '2016-03-08T15:00:00.000Z',
          timeZone: 'Central Standard Time'
        },
        end: {
          dateTime: '2016-03-08T15:30:00.000Z',
          timeZone: 'Central Standard Time'
        }
      },
      {
        start: {
          dateTime: '2016-03-08T15:30:00.000Z',
          timeZone: 'Central Standard Time'
        },
        end: {
          dateTime: '2016-03-08T16:30:00.000Z',
          timeZone: 'Central Standard Time'
        }
      },
      {
        start: {
          dateTime: '2016-03-08T16:30:00.000Z',
          timeZone: 'Central Standard Time'
        },
        end: {
          dateTime: '2016-03-08T19:30:00.000Z',
          timeZone: 'Central Standard Time'
        }
      },
      {
        start: {
          dateTime: '2016-03-08T19:30:00.000Z',
          timeZone: 'Central Standard Time'
        },
        end: {
          dateTime: '2016-03-08T20:00:00.000Z',
          timeZone: 'Central Standard Time'
        }
      }
    ];

    it('should default to filtering out reservations in the past.', () => {
      clock('Tuesday, March 8, 2016 10:00 AM CST');

      const result = filterExpiredReservations(mockReservations);
      const expected = mockReservations.slice(1, 4);

      expect(result).toEqual(expected);
    });

    it('should filter out reservations before any date given as a second parameter.', () => {
      const time = Date.parse('2016-03-08T19:30:00.000Z');
      const result = filterExpiredReservations(mockReservations, time);
      const expected = mockReservations.slice(2, 4);

      expect(result).toEqual(expected);
    });
  });
});
