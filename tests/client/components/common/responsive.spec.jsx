/* eslint-env node, jest */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Responsive from 'components/common/responsive';

describe('<Responsive/>', () => {
  const props = {
    mobileBreakpoint: 500,
    children: <div className='child' />,
    mobileAlt: <div className='mobile' />
  };

  it('renders children above the mobile breakpoint.', () => {
    props.deviceWidth = 600;
    const component = mount(<Responsive {...props} />);

    expect(component.find('.child').length).toEqual(1);
  });

  it('renders mobileAlt prop at or below the mobile breakpoint.', () => {
    props.deviceWidth = 500;
    const component = mount(<Responsive {...props} />);

    expect(component.find('.mobile').length).toEqual(1);
  });
});
