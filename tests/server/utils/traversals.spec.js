/* eslint-env node, jest */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import { getHost } from 'server/utils';

describe('Traversal utilities', () => {
  describe('getHost', () => {
    const mockReq = {
      headers: {
        host: '123456789'
      }
    };

    it('should return parsed host name.', () => {
      expect(getHost(mockReq)).toEqual('1234');
    });
  });
});
