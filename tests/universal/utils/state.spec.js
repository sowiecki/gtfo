/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import { handleAction } from 'server/utils';

describe('Universal utilities', () => {
  describe('handleAction', () => {
    const mockState = { foo: 'bar' };

    const mockAction = { type: 'BIZ_BAZ' };

    const mockReducers = {
      BIZ_BAZ() {
        return mockState.foo;
      }
    };

    it('should correctly reduce the action onto the state.', () => {
      const mockHandleAction = handleAction(mockState, mockAction, mockReducers);

      expect(mockHandleAction).toEqual(mockState.foo);
    });
  });
});
