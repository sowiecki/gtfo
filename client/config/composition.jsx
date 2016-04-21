import React from 'react';
import radium from 'radium';
import { pure } from 'recompose';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme();

/**
 * Provides Material-UI theme to <Body/>,
 * also useful for testing elements containing Material-UI components.
 * @param {object} element React Element.
 * @returns {object} React Element.
 */
export const provideMuiTheme = (element) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    {element}
  </MuiThemeProvider>
);

export const base = (component) => pure(component);

export const applyStyles = (component) => radium(pure(component));
