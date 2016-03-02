/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';
import { forEach } from 'lodash';

import * as RoomUtils from 'client/utils/rooms';

describe('Rooms utilities', () => {
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
      const meetingRooms = [
        { location: 'Winterfell' },
        { location: `King's Landing` },
        { location: `Mole's Town` },
        { location: 'Asshai' },
        { location: 'Asshai' },
        { location: 'Asshai' }
      ];

      expect(RoomUtils.filterByLocation(meetingRooms, 'winterfell').length).toBe(1);
      expect(RoomUtils.filterByLocation(meetingRooms, 'kings-landing').length).toBe(1);
      expect(RoomUtils.filterByLocation(meetingRooms, 'moles-town').length).toBe(1);
      expect(RoomUtils.filterByLocation(meetingRooms, 'asshai').length).toBe(3);
    });
  });

  describe('formatForDisplay', () => {
    it('should return an unslugified version of the provided string.', () => {
      const examples = [
        {
          slug: 'winterfell',
          pretty: 'Winterfell'
        },
        {
          slug: 'the-narrow-sea',
          pretty: 'The Narrow Sea'
        },
        {
          slug: 'the-land-of-always-winter',
          pretty: 'The Land Of Always Winter'
        }
      ];

      forEach(examples, (example) => {
        const result = RoomUtils.formatForDisplay(example.slug);

        expect(result).toBe(example.pretty);
      });
    });
  });
});
