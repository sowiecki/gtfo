/* eslint-env node, jest */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import { genURL } from 'server/utils';

describe('API utilities', () => {
  const mockConfig = {
    reservations: {
      host: 'foo',
      path: '/bar'
    },
    stalls: {
      host: 'bizz',
      path: ''
    },
    proxy: {
      host: 'bazz'
    }
  };

  describe('genURL', () => {
    it('should generate URLs from tenant host and path', () => {
      const reservationsResult = genURL(mockConfig.reservations);
      const stallsResult = genURL(mockConfig.stalls);
      const proxyResult = genURL(mockConfig.proxy);

      expect(reservationsResult).toEqual('foo/bar');
      expect(stallsResult).toEqual('bizz'); // Tests empty path
      expect(proxyResult).toEqual('bazz'); // Tests undefined path
    });
  });
});
