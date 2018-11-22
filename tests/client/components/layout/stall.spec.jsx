/* eslint-env node, jest */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import { VelocityComponent } from 'velocity-react';

import Stall from 'components/floor-plan/layout/location/stall';
import { DEFAULT } from 'constants';

describe('<Stall/>', () => {
  const props = {
    id: 'mensStall1',
    alert: 'VACANT',
    coordinates: {
      x: 1,
      y: 1,
      height: 1,
      width: 1
    },
    active: true,
    statusesTheme: DEFAULT
  };

  it('renders.', () => {
    const component = mount(<Stall {...props} />);

    expect(component.find(VelocityComponent).length).toEqual(1);
  });
});
