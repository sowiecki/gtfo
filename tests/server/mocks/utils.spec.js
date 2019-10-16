/* eslint-env node, jest */
import expect from 'expect';
import moment from 'moment';

import { randomReservationGap, generateMockReservation } from 'server/mocks/utils';

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

      expect(typeof mockReservation).toBe('object');

      expect(mockReservation.subject).toBeDefined();
      expect(typeof mockReservation.subject).toEqual('string');

      expect(mockReservation.start.dateTime).toBeDefined();
      expect(moment(mockReservation.start.dateTime).isValid()).toBe(true);

      expect(mockReservation.end.dateTime).toBeDefined();
      expect(moment(mockReservation.end.dateTime).isValid()).toBe(true);
    });
  });
});
