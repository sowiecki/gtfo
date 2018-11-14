/* eslint-env node, jest */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';

import Icon from '@material-ui/core/Icon';

import FutureReservations from 'components/floor-plan/layout/room-modal/future-reservations/index';

// import { VACANT, PING_ANIMATION_LOOPS } from 'constants/index';

describe('<FutureReservations />', () => {
  const clock = (time) =>
    sinon.useFakeTimers({
      now: Date.parse(time),
      toFake: ['Date']
    });

  beforeEach(() => {
    sinon.useFakeTimers().restore();
  });

  afterEach(() => {
    sinon.useFakeTimers().restore();
  });

  const props = {
    reservations: [
      {
        email: 'AliceMurphy@example.domain',
        startDate: '2018-11-14T15:00:00.000Z',
        endDate: '2018-11-14T15:30:00.000Z'
      },
      {
        email: 'AliceMurphy@example.domain',
        startDate: '2018-11-14T15:30:00.000Z',
        endDate: '2018-11-14T16:00:00.000Z'
      },
      {
        email: 'AdamDeMamp@example.domain',
        startDate: '2018-11-14T16:00:00.000Z',
        endDate: '2018-11-14T17:00:00.000Z'
      }
    ]
  };

  it('renders.', () => {
    const component = mount(<FutureReservations {...props} />);

    expect(component.find(Icon).length).toEqual(2);
  });

  it('Renders reservations within their correct time blocks.', () => {
    clock('2018-11-14T14:00:00.000Z');

    const component = mount(<FutureReservations {...props} />);
    const firstReservation = component.find('#_9-00AM');
    const firstReservationEmail = firstReservation.props().children[3].props.children;

    expect(firstReservation.length).toEqual(1);
    expect(firstReservationEmail).toEqual('AliceMurphy@example.domain');
  });
});
