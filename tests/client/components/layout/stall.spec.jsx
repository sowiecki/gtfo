/* eslint-env node, mocha */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import { VelocityComponent } from 'velocity-react';

import Stall from 'components/layout/stall';
import { provideMuiTheme } from 'config/composition';

describe('<Stall/>', () => {
  const props = {
    id: 'mensStall1',
    alert: 'VACANT',
    coordinates: {
      x: 1,
      y: 1,
      height: 1,
      width: 1
    }
  };

  it('renders.', () => {
    const component = mount(provideMuiTheme(<Stall {...props}/>));

    expect(component.find(VelocityComponent).length).toEqual(1);
  });
});
