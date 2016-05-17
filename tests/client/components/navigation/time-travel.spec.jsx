/* eslint-env node, mocha */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import { VelocityComponent } from 'velocity-react';
import Card from 'material-ui/Card/Card';
import TimePicker from 'material-ui/TimePicker';

import TimeTravel from 'components/navigation/time-travel';
import DisplayError from 'components/common/display-error';
import { provideMuiTheme } from 'config/composition';

describe('<TimeTravel/>', () => {
  const props = {
    actions: {
      emitTimeTravelUpdate: () => {},
      emitTimeTravelControlsToggle: () => {},
      clearTimeTravelError: () => {}
    },
    timeTravelledTo: null,
    timeTravelControlsOpen: false,
    timeTravelError: null
  };

  const component = mount(provideMuiTheme(<TimeTravel {...props}/>));

  it('renders an error snackbar.', () => {
    expect(component.find(DisplayError).length).toEqual(1);
  });

  it('renders a <TimePicker/> component inside of a <VelocityComponent/>.', () => {
    expect(component.find(VelocityComponent).find(Card).find(TimePicker).length).toEqual(1);
  });
});
