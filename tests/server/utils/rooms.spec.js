/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';
import moment from 'moment';
import timekeeper from 'timekeeper';
import { forEach } from 'lodash';

import { filterExpiredReservations } from 'server/utils/reservations';
import * as RoomUtils from 'server/utils/rooms';

import {
  VACANT,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED
} from 'server/constants/room-statuses';

describe('Server room utilities', () => {
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

  describe('getRoomAlert', () => {
    beforeEach(() => {
      timekeeper.reset();
    });

    afterEach(() =>{
      timekeeper.reset();
    });

    it('should correctly determine vacancy.', () => {
      expect(RoomUtils.getRoomAlert([])).toBe(VACANT);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 8:30 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(VACANT);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 12:31 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(VACANT);
    });

    it('should correctly determine one minute alerts.', () => {
      timekeeper.freeze(new Date('Tuesday, March 8, 2016 8:59 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(ONE_MINUTE_WARNING);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 9:28 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toNotBe(ONE_MINUTE_WARNING);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 9:29 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(ONE_MINUTE_WARNING);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 10:28 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toNotBe(ONE_MINUTE_WARNING);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 10:29 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(ONE_MINUTE_WARNING);
    });

    it('should correctly determine five minute alerts.', () => {
      timekeeper.freeze(new Date('Tuesday, March 8, 2016 8:55 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(FIVE_MINUTE_WARNING);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 9:28 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(FIVE_MINUTE_WARNING);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 9:27 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(FIVE_MINUTE_WARNING);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 10:25 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(FIVE_MINUTE_WARNING);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 10:28 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(FIVE_MINUTE_WARNING);
    });

    it('should correctly determine booked alerts.', () => {
      timekeeper.freeze(new Date('Tuesday, March 8, 2016 9:20 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(BOOKED);

      timekeeper.freeze(new Date('Tuesday, March 8, 2016 9:32 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(BOOKED);
      //
      timekeeper.freeze(new Date('Tuesday, March 8, 2016 9:45 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(BOOKED);
      //
      timekeeper.freeze(new Date('Tuesday, March 8, 2016 10:40 AM'));
      expect(RoomUtils.getRoomAlert(mockReservations())).toBe(BOOKED);
    });
  });
});
