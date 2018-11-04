/* eslint-env node, jest */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';
import { forEach } from 'lodash';

import {
  getPathname,
  filterByLocation,
  formatForDisplay,
  pluckLocations,
  youAreHere,
  hasAnchor,
  genWidthAndHeight,
  getLocationIndex
} from 'utils';

describe('Room utilities (client)', () => {
  const meetingRooms = [
    { location: 'Winterfell' },
    { location: 'King\'s Landing' },
    { location: 'Mole\'s Town' },
    { location: 'Asshai' },
    { location: 'Asshai' },
    { location: 'Asshai' }
  ];

  describe('getPathname', () => {
    it('should return pathname property of provided object.', () => {
      const location = {
        pathname: 'King\'s Road'
      };

      expect(getPathname(location)).toBe(location.pathname);
    });
  });

  describe('filterByLocation', () => {
    it('should return only rooms specific to provided location.', () => {
      expect(filterByLocation(meetingRooms, 'winterfell').length).toBe(1);
      expect(filterByLocation(meetingRooms, 'king\'s-landing').length).toBe(1);
      expect(filterByLocation(meetingRooms, 'mole\'s-town').length).toBe(1);
      expect(filterByLocation(meetingRooms, 'asshai').length).toBe(3);
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
        const result = formatForDisplay(example.slug);

        expect(result).toBe(example.pretty);
      });
    });
  });

  describe('pluckLocations', () => {
    it('should return a set of locations from a collection of rooms.', () => {
      const result = ['Winterfell', 'King\'s Landing', 'Mole\'s Town', 'Asshai'];

      expect(pluckLocations(meetingRooms)).toEqual(result);
    });
  });

  describe('youAreHere', () => {
    const location = {
      search: '?anchor=lobby'
    };

    it('should check if the provided marker matches the current location.', () => {
      expect(youAreHere({ name: 'Lobby' }, location)).toBe(true);
      expect(youAreHere({ name: 'lobby' }, location)).toBe(true);
      expect(youAreHere({ name: 'attic' }, location)).toBe(false);
      expect(youAreHere({ name: 'basement' }, location)).toBe(false);
    });
  });

  describe('youAreHere', () => {
    const locationWithAnchor = {
      search: '?anchor=lobby'
    };

    const locationWithoutAnchor = {
      search: ''
    };

    const locationWithNullAnchor = {};

    it('should check if the provided marker matches the current location.', () => {
      expect(hasAnchor(locationWithAnchor)).toBe(true);
      expect(hasAnchor(locationWithoutAnchor)).toBe(false);
      expect(hasAnchor(locationWithNullAnchor)).toBe(false);
    });
  });

  describe('genWidthAndHeight', () => {
    it('should generate width and height parameters with correct proportions.', () => {
      expect(genWidthAndHeight(300).trim()).toEqual('height: 345.6px;\n  width: 300px;');
      expect(genWidthAndHeight(350).trim()).toEqual('height: 403.2px;\n  width: 350px;');
      expect(genWidthAndHeight(800).trim()).toEqual('height: 921.6px;\n  width: 800px;');
    });
  });

  describe('getLocationIndex', () => {
    const mockLocationParams = ['Winterfell', 'Storm\'s End'];

    it('should find the index of a provided location parameter.', () => {
      expect(getLocationIndex(mockLocationParams, { pathname: 'Winterfell' })).toEqual(0);
      expect(getLocationIndex(mockLocationParams, { pathname: 'Storm\'s End' })).toEqual(1);
    });

    it('should fail gracefully, returning 0 when the parameter is not found.', () => {
      expect(getLocationIndex(mockLocationParams, { pathname: 'Casterly Rock' })).toEqual(0);
    });
  });
});
