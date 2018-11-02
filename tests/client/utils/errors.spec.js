/* eslint-env node, jest */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import { getBackdropErrorMessage } from 'utils';

describe('Logging utilities', () => {
  describe('getBackdropErrorMessage', () => {
    const mockLocation = 'Hill Valley';
    const errorMessage = `Failed to render backdrop for ${mockLocation}.`;
    const expected = `Make sure it's correctly saved in /environment/assets/ as ${mockLocation}.png`;

    it('should return a helpful error message.', () => {
      expect(getBackdropErrorMessage(mockLocation)).toBe(`${errorMessage} ${expected}`);
    });
  });
});
