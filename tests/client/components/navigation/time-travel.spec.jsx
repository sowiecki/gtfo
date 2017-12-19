/* eslint-env node, mocha */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import moment from 'moment';

import { VelocityComponent } from 'velocity-react';
import Card from 'material-ui/Card/Card';
import Slider from 'material-ui/Slider';

import TimeTravel from 'components/navigation/time-travel';
import { provideMuiTheme } from 'config/composition';
import { MAX_TIME, TIME_FORMAT } from 'constants/index';

describe('<TimeTravel/>', () => {
  const clock = (time) => sinon.useFakeTimers({
    now: Date.parse(time),
    toFake: ['Date']
  });

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

  it(`renders a <Slider/> inside of a <VelocityComponent/> before ${MAX_TIME}.`, () => {
    clock(moment('8:00AM', TIME_FORMAT));
    const component = mount(provideMuiTheme(<TimeTravel {...props}/>));

    expect(component.find(VelocityComponent).find(Card).find(Slider).length).toEqual(1);
  });

  it(`renders no <Slider/> component after ${MAX_TIME}.`, () => {
    clock(moment(MAX_TIME, TIME_FORMAT));
    const component = mount(provideMuiTheme(<TimeTravel {...props}/>));

    expect(component.find(VelocityComponent).find(Card).find(Slider).length).toEqual(0);
  });
});
