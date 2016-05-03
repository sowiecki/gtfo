/* eslint-env node, mocha */
import http from 'http';
import expect from 'expect';
import sinon from 'sinon';

import fetchStallOccupancies from 'server/middleware/fetch-stall-occupancies';
import { STALLS_URL } from 'server/constants';

describe('fetchStallOccupancies', () => {
  let spy;

  const mockNext = () => {};

  beforeEach((done) => {
    spy = sinon.spy(http, 'get');

    done();
  });

  afterEach(() => {
    spy.restore();
  });

  it(`should make an HTTP request to ${STALLS_URL}.`, (done) => {
    fetchStallOccupancies(mockNext);

    const urlCalled = spy.getCall(0).args[0];

    expect(spy.called).toBe(true);
    expect(urlCalled).toBe(STALLS_URL);

    done();
  });
});
