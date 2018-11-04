/* eslint-env node, jest */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import IconButton from '@material-ui/core/IconButton';

import HamburgerMenu from 'components/navigation/header/hamburger-menu';
import { provideMuiTheme } from 'config/composition';

describe('<HamburgerMenu/>', () => {
  const props = {
    toggleSiteNav: () => {}
  };

  const component = mount(provideMuiTheme(<HamburgerMenu {...props}/>));

  it('renders an icon', () => {
    expect(component.find(IconButton).length).toEqual(1);
    expect(component.find('button').find('i.material-icons').length).toEqual(1);
  });
});
