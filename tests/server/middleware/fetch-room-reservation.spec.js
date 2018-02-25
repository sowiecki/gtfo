/* eslint-env node, mocha */
import http from 'http';
import expect from 'expect';
import sinon from 'sinon';

import fetchRoomReservation from 'server/middleware/fetch-room-reservation';
import { genURL } from 'server/utils';
import { config } from '../../../environment';

describe('fetchRoomReservation', () => {
  let stub;
  const reservationsURL = genURL(config.reservations);

  const mockNext = () => {};

  beforeEach((done) => {
    stub = sinon.stub(http, 'get');

    done();
  });

  afterEach(() => {
    stub.restore();
  });

  it(`should make an HTTP request to ${reservationsURL}.`, (done) => {
    fetchRoomReservation(mockNext);

    const urlCalled = stub.getCall(0).args[0];

    expect(stub.called).toBe(true);
    expect(urlCalled).toBe(reservationsURL);

    done();
  });
});
