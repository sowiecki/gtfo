/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';
import { forEach } from 'lodash';

import { getPathname,
         filterByLocation,
         formatForDisplay,
         pluckLocations,
         getAnchorFromStore,
         youAreHere,
         hasAnchor,
         calcFahrenheitTemp,
         calcCelciusTemp } from 'utils';

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
      expect(filterByLocation(meetingRooms, 'kings-landing').length).toBe(1);
      expect(filterByLocation(meetingRooms, 'moles-town').length).toBe(1);
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
      const result = [
        'Winterfell',
        'King\'s Landing',
        'Mole\'s Town',
        'Asshai'
      ];

      expect(pluckLocations(meetingRooms)).toEqual(result);
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
      expect(getAnchorFromStore(mockStore)).toEqual('example-anchor');
    });

    it('should return an empty string if it can\'t find an anchor.', () => {
      mockReducers.routeReducer.location.query = null;

      expect(getAnchorFromStore(mockStore)).toEqual('');
    });
  });

  describe('youAreHere', () => {
    const location = {
      query: { anchor: 'lobby' }
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
      query: { anchor: 'lobby' }
    };

    const locationWithoutAnchor = {
      query: {}
    };

    const locationWithNullAnchor = {
      query: { anchor: null }
    };

    it('should check if the provided marker matches the current location.', () => {
      expect(hasAnchor(locationWithAnchor)).toBe(true);
      expect(hasAnchor(locationWithoutAnchor)).toBe(false);
      expect(hasAnchor(locationWithNullAnchor)).toBe(false);
    });
  });

  describe('calcFahrenheitTemp', () => {
    it('should calculate fahrenheit temperature based on TMP36 sensor voltage.', () => {
      expect(calcFahrenheitTemp(10)).toBe(70);
      expect(calcFahrenheitTemp(15)).toBe(75);
      expect(calcFahrenheitTemp(20)).toBe(80);
    });
  });

  describe('calcCelciusTemp', () => {
    it('should calculate celcius temperature based on TMP36 sensor voltage.', () => {
      expect(calcCelciusTemp(0)).toBe(32);
      expect(calcCelciusTemp(5)).toBe(37);
      expect(calcCelciusTemp(10)).toBe(42);
    });
  });
});
