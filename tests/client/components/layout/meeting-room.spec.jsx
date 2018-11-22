/* eslint-env node, jest */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import { VelocityComponent } from 'velocity-react';

import MeetingRoom from 'components/floor-plan/layout/location/meeting-room';
import Temperature from 'components/floor-plan/layout/location/meeting-room/temperature';
import { VACANT, PING_ANIMATION_LOOPS, DEFAULT } from 'constants';

describe('<MeetingRoom/>', () => {
  const props = {
    meetingRoom: {
      name: 'Winterfell',
      coordinates: {
        x: 1,
        y: 1,
        height: 1,
        width: 1
      },
      alert: VACANT,
      unitOfTemp: 'F',
      displayTemp: false,
      pinged: null,
      connectionStatus: true,
      currentReservation: {
        email: 'foo@bar.com'
      },
      reservations: [
        {
          email: 'foo@bar.com'
        },
        {
          email: 'bizz@bazz.com'
        }
      ]
    },
    statusesTheme: DEFAULT
  };

  it('renders.', () => {
    const component = mount(<MeetingRoom {...props} />);

    expect(component.find('svg').length).toEqual(2);
    expect(component.find(Temperature).length).toEqual(0);
  });

  // TODO update to test new pure CSS animation method
  it.skip('animates when ping prop is true.', () => {
    props.meetingRoom.pinged = true;

    const component = mount(<MeetingRoom {...props} />);

    expect(
      component
        .find(VelocityComponent)
        .at(1)
        .props().loop
    ).toEqual(PING_ANIMATION_LOOPS);
  });

  it('renders temperature component when enabled through prop.', () => {
    props.displayTemp = true;

    const component = mount(<MeetingRoom {...props} />);

    expect(component.find(Temperature).length).toEqual(1);
  });
});
