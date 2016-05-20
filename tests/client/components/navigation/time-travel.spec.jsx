/* eslint-env node, mocha */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import { VelocityComponent } from 'velocity-react';
import Card from 'material-ui/Card/Card';
import Slider from 'material-ui/Slider';

import TimeTravel from 'components/navigation/time-travel';
import { provideMuiTheme } from 'config/composition';

describe('<TimeTravel/>', () => {
  const props = {
    actions: {
      emitTimeTravelUpdate: () => {},
      emitTimeTravelControlsToggle: () => {},
      clearTimeTravelError: () => {}
    },
    timeTravelledTo: null,
    timeTravelControlsOpen: false
  };

  const component = mount(provideMuiTheme(<TimeTravel {...props}/>));

  it('renders a <Slider/> component inside of a <VelocityComponent/>.', () => {
    expect(component.find(VelocityComponent).find(Card).find(Slider).length).toEqual(1);
  });
});
