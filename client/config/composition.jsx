import React from 'react';
import radium from 'radium';
import { pure } from 'recompose';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { colors } from '../components/common/styles';

const muiTheme = getMuiTheme({
  palette: {
    pickerHeaderColor: colors.primary,
    primary1Color: colors.secondary
  }
});

/**
 * Provides material-ui theme to <Body/>,
 * also useful for testing elements containing material-ui components.
 * @param {object} element React Element.
 * @returns {object} React Element.
 */
export const provideMuiTheme = (element) => (
  <MuiThemeProvider muiTheme={muiTheme}>{element}</MuiThemeProvider>
);

export const base = (component) => pure(component);

export const applyStyles = (component) => radium(base(component));
