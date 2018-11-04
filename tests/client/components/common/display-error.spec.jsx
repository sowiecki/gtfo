/* eslint-env node, jest */
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Snackbar from '@material-ui/core/Snackbar';

import DisplayError from 'components/common/display-error';

describe('<DisplayError/>', () => {
  const props = {
    error: {
      message: 'Someone spilled coffee on the server!'
    }
  };

  it('renders a Snackbar.', () => {
    const component = mount(<DisplayError />);

    expect(component.find(Snackbar).length).toEqual(1);
    expect(component.find(Snackbar).props().open).toEqual(false);
  });

  it('renders a open Snackbar when provided with an error prop.', () => {
    const component = mount(<DisplayError {...props} />);

    expect(component.find(Snackbar).length).toEqual(1);
    expect(component.find(Snackbar).props().open).toEqual(true);
  });
});
