/* eslint-env node, jest */
import http from 'http';
import expect from 'expect';
import sinon from 'sinon';

import fetchRoomReservation from 'server/middleware/fetch-room-reservation';
import { config } from '../../../environment';

describe('fetchRoomReservation', () => {
  let stub;
  const expectedArgsCalled = {
    host: config.reservations.hostname,
    port: config.reservations.port,
    path: config.reservations.path,
    method: 'GET'
  };

  const mockNext = () => {};

  beforeEach((done) => {
    stub = sinon.stub(http, 'request');

    done();
  });

  afterEach(() => {
    stub.restore();
  });

  it(`should make an HTTP request to ${JSON.stringify(expectedArgsCalled)}.`, (done) => {
    fetchRoomReservation(mockNext);

    const argsCalled = stub.getCall(0).args[0];

    expect(stub.called).toEqual(true);
    expect(argsCalled).toEqual(expectedArgsCalled);

    done();
  });
});
