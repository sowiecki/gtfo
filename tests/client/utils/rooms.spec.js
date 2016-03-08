/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';
import { forEach } from 'lodash';

import * as RoomUtils from 'client/utils/rooms';

describe('Rooms utilities', () => {
  const meetingRooms = [
    { location: 'Winterfell' },
    { location: `King's Landing` },
    { location: `Mole's Town` },
    { location: 'Asshai' },
    { location: 'Asshai' },
    { location: 'Asshai' }
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

  describe('pluckLocations', () => {
    it('should return a set of locations from a collection of rooms.', () => {
      const result = [
        'Winterfell',
        `King's Landing`,
        `Mole's Town`,
        'Asshai'
      ];

      expect(RoomUtils.pluckLocations(meetingRooms)).toEqual(result);
    });
  });

  describe('getAnchorFromStore', () => {
    const mockReducers = {
      routeReducer: {
        location: {
          query: { anchor: 'example-anchor' }
        }
      }
    };

    const mockStore = {
      getState() {
        return mockReducers;
      }
    };

    it('should return the anchor from a Redux store.', () => {
      expect(RoomUtils.getAnchorFromStore(mockStore)).toEqual('example-anchor');
    });

    it(`should return an empty string if it can't find an anchor.`, () => {
      mockReducers.routeReducer.location.query = null;

      expect(RoomUtils.getAnchorFromStore(mockStore)).toEqual('');
    });
  });

  describe('youAreHere', () => {
    const location = {
      query: {
        anchor: 'lobby'
      }
    };

    it('should check if the provided marker matches the current location.', () => {
      expect(RoomUtils.youAreHere({ name: 'Lobby' }, location)).toBe(true);
      expect(RoomUtils.youAreHere({ name: 'lobby' }, location)).toBe(true);
      expect(RoomUtils.youAreHere({ name: 'attic' }, location)).toBe(false);
      expect(RoomUtils.youAreHere({ name: 'basement' }, location)).toBe(false);
    });
  });
});
