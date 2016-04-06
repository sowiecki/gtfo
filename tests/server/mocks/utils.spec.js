/* eslint-env node, mocha */
import expect from 'expect';
import moment from 'moment';

import { randomReservationGap,
         generateMockReservation } from 'mocks/utils';

describe('Mock utilities', () => {
  describe('randomReservationGap', () => {
    it('should generate a random reservation gap.', () => {
      const results = [0, 30, 60, 90];

      for (let i = 0; i++; i > 20) {
        expect(results).toInclude(randomReservationGap());
      }
    });
  });

  describe('generateMockReservation', () => {
    it('should generate a mock reservation.', () => {
      const mockReservation = generateMockReservation();

      expect(mockReservation).toBeAn('object');

      expect(mockReservation.email).toExist();
      expect(mockReservation.email).toBeA('string');

      expect(mockReservation.startDate).toExist();
      expect(moment(mockReservation.startDate).isValid()).toBe(true);

      expect(mockReservation.endDate).toExist();
      expect(moment(mockReservation.endDate).isValid()).toBe(true);
    });
  });
});
