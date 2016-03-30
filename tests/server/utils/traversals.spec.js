/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import { getHost, getOrigin } from 'server/utils';

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

  describe('getOrigin', () => {
    const mockClient = {
      upgradeReq: {
        headers: {
          'sec-websocket-key': 'isNotSteam'
        }
      }
    };

    it('should return parsed origin name.', () => {
      expect(getOrigin(mockClient)).toEqual('isNotSteam');
    });
  });
});
