/* eslint-env node, mocha */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import IconButton from 'material-ui/IconButton';

import MenuButton from 'components/navigation/menu-button';
import { provideMuiTheme } from 'config/composition';

describe('<MenuButton/>', () => {
  const props = {
    toggleSiteNav: () => {}
  };

  const component = mount(provideMuiTheme(<MenuButton {...props}/>));

  it('renders an icon', () => {
    expect(component.find(IconButton).length).toEqual(1);
    expect(component.find('div').find('i.material-icons').length).toEqual(1);
  });
});
