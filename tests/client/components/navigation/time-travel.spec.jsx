/* eslint-env node, mocha */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';

import { VelocityComponent } from 'velocity-react';
import Card from 'material-ui/Card/Card';
import Slider from 'material-ui/Slider';

import { MAX_TIME } from 'constants';
import TimeTravel from 'components/navigation/time-travel';
import { provideMuiTheme } from 'config/composition';

describe('<TimeTravel/>', () => {
  const clock = (time) => sinon.useFakeTimers(Date.parse(time), 'Date');

  const props = {
    actions: {
      emitTimeTravelUpdate: () => {},
      emitTimeTravelControlsToggle: () => {},
      emitTimeSliderValueUpdate: () => {},
    },
    onTimeTravelDismissClick: () => {},
    timeTravelledTo: null,
    timeTravelControlsOpen: false
  };

  beforeEach(() => {
    sinon.useFakeTimers().restore();
  });

  afterEach(() => {
    sinon.useFakeTimers().restore();
  });

  it(`renders a <Slider/> component inside of a <VelocityComponent/> before ${MAX_TIME}.`, () => {
    clock('Tuesday, March 8, 2016 3:00 PM CST');
    const component = mount(provideMuiTheme(<TimeTravel {...props}/>));

    expect(component.find(VelocityComponent).find(Card).find(Slider).length).toEqual(1);
  });

  it(`renders no <Slider/> component after ${MAX_TIME}.`, () => {
    clock('Tuesday, March 8, 2016 8:01 PM CST');
    const component = mount(provideMuiTheme(<TimeTravel {...props}/>));

    expect(component.find(VelocityComponent).find(Card).find(Slider).length).toEqual(0);
  });
});
