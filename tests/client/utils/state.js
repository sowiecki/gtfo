/* eslint-env node, jest */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import { formatLocationProps } from 'utils';

describe('Navigation utilities', () => {
  const mockReducerProps = {
    pathname: '/gazorpazorp',
    search: '?dimension=C137'
  };

  describe('formatLocationProps', () => {
    it('should return parsed position coordinates.', () => {
      const expected = {
        pathname: '/gazorpazorp',
        search: '?dimension=C137'
      };
      const result = formatLocationProps(mockReducerProps);

      expect(result).toEqual(expected);
    });
  });
});
