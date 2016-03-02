/* eslint-env node, mocha */
import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { IconButton } from 'material-ui/lib';

import MenuButton from 'client/components/navigation/menu-button';

describe('<MenuButton />', () => {
  const props = {
    toggleSiteNav: () => {}
  };

  const component = shallow(<MenuButton {...props}/>);

  it('contains an icon button', () => {
    expect(component.find(<IconButton/>)).toNotEqual(null);
  });
});
