/* globals describe it */
import expect from 'expect';
import slug from 'slug';

import * as RoomUtils from '../../utils/rooms';

describe('Rooms utilities', () => {
  const meetingRooms = [
    {
      location: 'Winterfell'
    },
    {
      location: `King's Landing`
    },
    {
      location: 'Castle Black'
    }
  ];

  describe('getPathname', () => {
    it('should return pathname property of provided object.', () => {
      const location = {
        pathname: `King's Road`
      };

      expect(RoomUtils.getPathname(location)).toBe(location.pathname);
    });
  });

  describe('filterByLocation', () => {
    it('should return only rooms specific to provided location.', () => {
      const testLocations = [
        slug('Winterfell', { lower: true }),
        slug('Castle Black', { lower: true })
      ];

      expect(RoomUtils.filterByLocation(meetingRooms, testLocations[0]).length).toBe(1);
      expect(RoomUtils.filterByLocation(meetingRooms, testLocations[1]).length).toBe(1);
    });
  });
});
