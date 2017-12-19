/* eslint-env node, mocha */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import { VelocityComponent } from 'velocity-react';

import MeetingRoom from 'components/layout/meeting-room';
import Temperature from 'components/layout/temperature';
import { provideMuiTheme } from 'config/composition';
import { VACANT, PING_ANIMATION_LOOPS } from 'constants/index';

describe('<MeetingRoom/>', () => {
  const props = {
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
    connectionStatus: true
  };

  it('renders.', () => {
    const component = mount(provideMuiTheme(<MeetingRoom {...props}/>));

    expect(component.find('svg').length).toEqual(1);
    expect(component.find(VelocityComponent).length).toEqual(2);
    expect(component.find(VelocityComponent).at(1).props().loop).toEqual(0);
    expect(component.find(Temperature).length).toEqual(0);
  });

  it('animates when ping prop is true.', () => {
    props.pinged = true;

    const component = mount(provideMuiTheme(<MeetingRoom {...props}/>));

    expect(component.find(VelocityComponent).at(1).props().loop).toEqual(PING_ANIMATION_LOOPS);
  });

  it('renders temperature component when enabled through prop.', () => {
    props.displayTemp = true;

    const component = mount(provideMuiTheme(<MeetingRoom {...props}/>));

    expect(component.find(Temperature).length).toEqual(1);
  });
});
