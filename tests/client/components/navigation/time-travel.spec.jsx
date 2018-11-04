/* eslint-env node, jest */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import moment from 'moment';

import { VelocityComponent } from 'velocity-react';
import Card from '@material-ui/core/Card';
import Slider from '@material-ui/lab/Slider';

import TimeTravel from 'components/navigation/time-travel';
import { MAX_TIME, TIME_FORMAT } from 'constants/index';

describe('<TimeTravel/>', () => {
  const clock = (time) =>
    sinon.useFakeTimers({
      now: Date.parse(time),
      toFake: ['Date']
    });

  const props = {
    actions: {
      emitTimeTravelUpdate: () => {},
      emitTimeTravelControlsToggle: () => {},
      emitTimeSliderValueUpdate: () => {}
    },
    onTimeTravelDismissClick: () => {},
    timeTravelledTo: null,
    timeTravelControlsOpen: false,
    timeSliderValue: 0
  };

  beforeEach(() => {
    sinon.useFakeTimers().restore();
  });

  afterEach(() => {
    sinon.useFakeTimers().restore();
  });

  it(`renders a <Slider/> inside of a <VelocityComponent/> before ${MAX_TIME}.`, () => {
    clock(moment('8:00AM', TIME_FORMAT));
    const component = mount(<TimeTravel {...props} />);

    expect(
      component
        .find(VelocityComponent)
        .find(Card)
        .find(Slider).length
    ).toEqual(1);
  });

  it(`renders no <Slider/> component after ${MAX_TIME}.`, () => {
    clock(moment(MAX_TIME, TIME_FORMAT));
    const component = mount(<TimeTravel {...props} />);

    expect(
      component
        .find(VelocityComponent)
        .find(Card)
        .find(Slider).length
    ).toEqual(0);
  });
});
