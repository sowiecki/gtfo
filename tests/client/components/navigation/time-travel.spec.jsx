/* eslint-env node, jest */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import moment from 'moment';

import Slider from '@material-ui/lab/Slider';

import NotchedDrawer from 'components/common/notched-drawer';
import TimeTravel from 'components/navigation/time-travel';
import { MAX_TIME, TIME_FORMAT } from 'constants/index';

describe('<TimeTravel/>', () => {
  const clock = (time) =>
    sinon.useFakeTimers({
      now: Date.parse(time),
      toFake: ['Date']
    });

  const props = {
    timezone: -360,
    actions: {
      emitTimeTravelUpdate: () => {},
      emitTimeTravelControlsToggle: () => {},
      emitTimeSliderValueUpdate: () => {}
    },
    onTimeTravelDismissClick: () => {},
    timeTravelledTo: null,
    timeTravelControlsOpen: true,
    timeSliderValue: 0
  };

  beforeEach(() => {
    sinon.useFakeTimers().restore();
  });

  afterEach(() => {
    sinon.useFakeTimers().restore();
  });

  it(`renders a <Slider/> inside of a <Drawer/> before ${MAX_TIME}.`, () => {
    clock(moment('2018-11-23T14:00:00.000Z').utcOffset(-360));
    const component = mount(<TimeTravel {...props} />);

    expect(component.find(NotchedDrawer).find(Slider).length).toEqual(1);
  });

  it(`renders no <Slider/> component after ${MAX_TIME}.`, () => {
    clock(moment(MAX_TIME, TIME_FORMAT).utcOffset(-360));
    const component = mount(<TimeTravel {...props} />);

    expect(component.find(NotchedDrawer).find(Slider).length).toEqual(0);
  });
});
