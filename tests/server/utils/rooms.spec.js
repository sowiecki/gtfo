/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';
import moment from 'moment';
import sinon from 'sinon';

import { filterExpiredReservations,
         getRoomAlert,
         secureRoom,
         secureRooms,
         getFutureAlerts } from 'server/utils';

import { SQUATTED,
         VACANT,
         ONE_MINUTE_WARNING,
         FIVE_MINUTE_WARNING,
         BOOKED } from 'server/constants';
import { TIME_FORMAT } from 'universal/constants';

describe('Room utilities (server)', () => {
  const clock = (time) => sinon.useFakeTimers(Date.parse(time), 'Date');

  const baseMockReservations = [
    {
      startDate: '2016-03-08T15:00:00.000Z',
      endDate: '2016-03-08T15:30:00.000Z'
    },
    {
      startDate: '2016-03-08T15:30:00.000Z',
      endDate: '2016-03-08T16:30:00.000Z'
    },
    {
      startDate: '2016-03-08T16:30:00.000Z',
      endDate: '2016-03-08T19:30:00.000Z'
    },
    {
      startDate: '2016-03-08T19:30:00.000Z',
      endDate: '2016-03-08T20:00:00.000Z'
    }
  ];

  /**
   * NOTE `getRoomAlert` assumes that none of the provided reservations contain
   * both a startDate and an endDate in the past. Mock reservations must be
   * manipulated to remove expired reservations.
   *
   * These reservations must wrapped in a function and only invoked once sinon
   * has mocked the system time appropriately for testing.
   */
  const mockReservations = () => filterExpiredReservations(baseMockReservations);

  describe('getRoomAlert', () => {
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

    const hasActiveMotion = moment();
    const hasNoActiveMotion = false;

    beforeEach(() => {
      sinon.useFakeTimers().restore();
    });

    afterEach(() => {
      sinon.useFakeTimers().restore();
    });

    it('should correctly determine squatting', () => {
      vacantTimes.forEach((vacantTime) => {
        clock(vacantTime);
        expect(getRoomAlert(mockReservations(), hasActiveMotion)).toBe(SQUATTED);
      });
    });

    it('should correctly determine vacancy.', () => {
      expect(getRoomAlert([])).toBe(VACANT);
      expect(getRoomAlert([], hasNoActiveMotion)).toBe(VACANT);

      vacantTimes.forEach((vacantTime) => {
        clock(vacantTime);
        expect(getRoomAlert(mockReservations(), hasNoActiveMotion)).toBe(VACANT);
      });
    });

    it('should correctly determine five minute alerts.', () => {
      fiveMinuteWarningTimes.forEach((fiveMinuteWarningTime) => {
        clock(fiveMinuteWarningTime);
        expect(getRoomAlert(mockReservations(), hasNoActiveMotion)).toBe(FIVE_MINUTE_WARNING);
      });

      fiveMinuteWarningTimes.forEach((fiveMinuteWarningTime) => {
        clock(fiveMinuteWarningTime);
        expect(getRoomAlert(mockReservations(), hasActiveMotion)).toBe(FIVE_MINUTE_WARNING);
      });
    });

    it('should correctly determine one minute alerts.', () => {
      oneMinuteWarningTimes.forEach((oneMinuteWarningTime) => {
        clock(oneMinuteWarningTime);
        expect(getRoomAlert(mockReservations(), hasNoActiveMotion)).toBe(ONE_MINUTE_WARNING);
      });

      oneMinuteWarningTimes.forEach((oneMinuteWarningTime) => {
        clock(oneMinuteWarningTime);
        expect(getRoomAlert(mockReservations(), hasActiveMotion)).toBe(ONE_MINUTE_WARNING);
      });
    });

    it('should correctly determine booked alerts.', () => {
      bookedTimes.forEach((bookedTime) => {
        clock(bookedTime);
        expect(getRoomAlert(mockReservations(), hasNoActiveMotion)).toBe(BOOKED);
      });

      bookedTimes.forEach((bookedTime) => {
        clock(bookedTime);
        expect(getRoomAlert(mockReservations(), hasActiveMotion)).toBe(BOOKED);
      });
    });
  });

  const mockRoom = {
    id: 'hyrule castle',
    alert: 'BOOKED',
    coordinates: {},
    location: 'Hyrule',
    name: 'Hyrule Castle',
    deviceAlias: 'Ganon',
    deviceId: 'heyListen',
    deviceAuthToken: 'hunter2',
    thermo: {
      F: '65',
      C: '18'
    }
  };

  const mockSecureRoom = {
    id: 'hyrule castle',
    alert: 'BOOKED',
    coordinates: {},
    location: 'Hyrule',
    name: 'Hyrule Castle',
    thermo: {
      F: '65',
      C: '18'
    }
  };

  describe('secureRoom', () => {
    it('should clone room object, with public-safe values only.', () => {
      expect(secureRoom(mockRoom)).toEqual(mockSecureRoom);
    });
  });

  describe('secureRooms', () => {
    it('should clone array of room objects, with public-safe values only.', () => {
      expect(secureRooms([mockRoom])).toEqual([mockSecureRoom]);
    });
  });

  describe('getFutureAlerts', () => {
    it('should return meeting rooms as they would be for the given future time parameter', () => {
      clock('Tuesday, March 8, 2016 8:59 AM CST');

      const mockRooms = [
        {
          name: 'Hill Valley',
          reservations: []
        },
        {
          name: 'Twin Pines Mall',
          reservations: mockReservations()
        }
      ];

      const futureTimes = [
        { '9:10AM': BOOKED },
        { '10:00AM': BOOKED },
        { '10:25AM': FIVE_MINUTE_WARNING },
        { '10:26AM': FIVE_MINUTE_WARNING },
        { '10:27AM': FIVE_MINUTE_WARNING },
        { '10:28AM': FIVE_MINUTE_WARNING },
        { '10:29AM': ONE_MINUTE_WARNING }
      ];

      expect(getFutureAlerts(mockRooms)[0].alert, moment('8:00PM', TIME_FORMAT)).toEqual(VACANT);

      futureTimes.forEach((futureTimePairs) => {
        const key = Object.keys(futureTimePairs)[0];
        const time = moment(key, TIME_FORMAT);
        const expected = futureTimePairs[key];

        expect(getFutureAlerts(mockRooms, time)[0].alert).toEqual(VACANT);
        expect(getFutureAlerts(mockRooms, time)[1].alert).toEqual(expected);
      });
    });
  });
});
