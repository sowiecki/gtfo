/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';
import sinon from 'sinon';

import { filterExpiredReservations, getRoomAlert } from 'server/utils';

import {
  VACANT,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED
} from 'server/constants';

describe('Room utilities (server)', () => {
  /**
   * NOTE `getRoomAlert` assumes that none of the provided reservations contain
   * both a startDate and an endDate in the past. Mock reservations must be
   * manipulated to remove expired reservations.
   *
   * These reservations must wrapped in a function and only invoked once timekeeper
   * has timetravelled to the correct time for testing.
   */

  const mockReservations = () => (filterExpiredReservations([
    {
      'startDate': '2016-03-08T15:00:00.000Z',
      'endDate': '2016-03-08T15:30:00.000Z'
    },
    {
      'startDate': '2016-03-08T15:30:00.000Z',
      'endDate': '2016-03-08T16:30:00.000Z'
    },
    {
      'startDate': '2016-03-08T16:30:00.000Z',
      'endDate': '2016-03-08T19:30:00.000Z'
    },
    {
      'startDate': '2016-03-08T19:30:00.000Z',
      'endDate': '2016-03-08T20:00:00.000Z'
    }
  ]));

  const vacantTimes = [
    'Tuesday, March 8, 2016 8:30 AM CST',
    'Tuesday, March 8, 2016 8:31 AM CST',
    'Tuesday, March 8, 2016 8:32 AM CST',
    'Tuesday, March 8, 2016 8:33 AM CST',
    'Tuesday, March 8, 2016 8:34 AM CST',
    'Tuesday, March 8, 2016 8:35 AM CST',
    'Tuesday, March 8, 2016 8:54 AM CST',
    'Tuesday, March 8, 2016 12:30 AM CST',
    'Tuesday, March 8, 2016 12:31 AM CST',
    'Tuesday, March 8, 2016 12:32 AM CST',
    'Tuesday, March 8, 2016 12:33 AM CST',
    'Tuesday, March 8, 2016 12:34 AM CST',
    'Tuesday, March 8, 2016 12:35 AM CST'
  ];

  const fiveMinuteWarningTimes = [
    'Tuesday, March 8, 2016 8:55 AM CST',
    'Tuesday, March 8, 2016 8:56 AM CST',
    'Tuesday, March 8, 2016 8:57 AM CST',
    'Tuesday, March 8, 2016 8:58 AM CST',
    'Tuesday, March 8, 2016 9:25 AM CST',
    'Tuesday, March 8, 2016 9:26 AM CST',
    'Tuesday, March 8, 2016 9:27 AM CST',
    'Tuesday, March 8, 2016 9:28 AM CST',
    'Tuesday, March 8, 2016 10:25 AM CST',
    'Tuesday, March 8, 2016 10:26 AM CST',
    'Tuesday, March 8, 2016 10:27 AM CST',
    'Tuesday, March 8, 2016 10:28 AM CST'
  ];

  const oneMinuteWarningTimes = [
    'Tuesday, March 8, 2016 8:59 AM CST',
    'Tuesday, March 8, 2016 9:29 AM CST',
    'Tuesday, March 8, 2016 10:29 AM CST'
  ];

  const bookedTimes = [
    'Tuesday, March 8, 2016 9:20 AM CST',
    'Tuesday, March 8, 2016 9:32 AM CST',
    'Tuesday, March 8, 2016 9:45 AM CST',
    'Tuesday, March 8, 2016 10:40 AM CST',
    'Tuesday, March 8, 2016 1:59 PM CST'
  ];

  describe('getRoomAlert', () => {
    const clock = (time) => sinon.useFakeTimers(Date.parse(time), 'Date');

    beforeEach(() => {
      sinon.useFakeTimers().restore();
    });

    afterEach(() => {
      sinon.useFakeTimers().restore();
    });

    it('should correctly determine vacancy.', () => {
      expect(getRoomAlert([])).toBe(VACANT);

      vacantTimes.forEach((vacantTime) => {
        clock(vacantTime);
        expect(getRoomAlert(mockReservations())).toBe(VACANT);
      });
    });

    it('should correctly determine five minute alerts.', () => {
      fiveMinuteWarningTimes.forEach((fiveMinuteWarningTime) => {
        clock(fiveMinuteWarningTime);
        expect(getRoomAlert(mockReservations())).toBe(FIVE_MINUTE_WARNING);
      });
    });

    it('should correctly determine one minute alerts.', () => {
      oneMinuteWarningTimes.forEach((oneMinuteWarningTime) => {
        clock(oneMinuteWarningTime);
        expect(getRoomAlert(mockReservations())).toBe(ONE_MINUTE_WARNING);
      });
    });

    it('should correctly determine booked alerts.', () => {
      bookedTimes.forEach((bookedTime) => {
        clock(bookedTime);
        expect(getRoomAlert(mockReservations())).toBe(BOOKED);
      });
    });
  });
});
