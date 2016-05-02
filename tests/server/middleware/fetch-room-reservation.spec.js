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

  beforeEach(() => {
    spy = sinon.spy(http, 'get');
  });

  afterEach(() => {
    spy.restore();
  });

  it(`should make an HTTP request to ${RESERVATIONS_URL}.`, () => {
    fetchRoomReservation(mockNext, mockAction);

    const urlCalled = spy.getCall(0).args[0];
    const expectedUrl = 'http://localhost:8080/rest/meetingRoom/lookup/Castle%20Black';

    expect(spy.called).toBe(true);
    expect(urlCalled).toBe(expectedUrl);
  });
});
