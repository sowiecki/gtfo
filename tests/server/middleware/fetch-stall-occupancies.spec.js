/* eslint-env node, jest */
import http from 'http';
import expect from 'expect';
import sinon from 'sinon';

import fetchStallOccupancies from 'server/middleware/fetch-stall-occupancies';
import { genURL } from 'server/utils';
import { config } from '../../../environment';

describe('fetchStallOccupancies', () => {
  let stub;
  const stallsURL = genURL(config.stalls);

  const mockNext = () => {};

  beforeEach((done) => {
    stub = sinon.stub(http, 'get');

    done();
  });

  afterEach(() => {
    stub.restore();
  });

  it(`should make an HTTP request to ${stallsURL}.`, (done) => {
    fetchStallOccupancies(mockNext);

    const urlCalled = stub.getCall(0).args[0];

    expect(stub.called).toBe(true);
    expect(urlCalled).toBe(stallsURL);

    done();
  });
});
