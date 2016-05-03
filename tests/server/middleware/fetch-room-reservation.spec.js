/* eslint-env node, mocha */
import http from 'http';
import expect from 'expect';
import sinon from 'sinon';

import fetchRoomReservation from 'server/middleware/fetch-room-reservation';
import { RESERVATIONS_URL } from 'server/constants';

describe('fetchRoomReservation', () => {
  let spy;

  const mockNext = () => {};
  const mockAction = {
    room: {
      id: 'Castle Black'
    }
  };

  beforeEach((done) => {
    spy = sinon.spy(http, 'get');

    done();
  });

  afterEach(() => {
    spy.restore();
  });

  it(`should make an HTTP request to ${RESERVATIONS_URL}.`, (done) => {
    fetchRoomReservation(mockNext, mockAction);

    const urlCalled = spy.getCall(0).args[0];
    const expectedUrl = `${RESERVATIONS_URL}${encodeURIComponent(mockAction.room.id)}`;

    expect(spy.called).toBe(true);
    expect(urlCalled).toBe(expectedUrl);

    done();
  });
});