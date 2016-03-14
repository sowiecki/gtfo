/* eslint-env node, mocha */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import * as HostUtils from 'server/utils/host';

describe('Host utilities', () => {
  describe('getHost', () => {
    const mockReq = {
      headers: {
        host: '123456789'
      }
    };

    it('should return parsed host name.', () => {
      expect(HostUtils.getHost(mockReq)).toEqual('1234');
    });
  });

  describe('getOrigin', () => {
    const mockClient = {
      upgradeReq: {
        headers: {
          origin: 'isNotSteam'
        }
      }
    };

    it('should return parsed origin name.', () => {
      expect(HostUtils.getOrigin(mockClient)).toEqual('isNotSteam');
    });
  });
});
