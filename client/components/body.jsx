import React, { PropTypes } from 'react';
import { StyleRoot, Style } from 'radium';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavigationContainer from './navigation/container';
import DevTools from './dev-tools';

import { base } from '../config/composition';
import { rules } from './common/styles';

const muiTheme = getMuiTheme();

const Body = (props) => {
  const isProd = process.env.NODE_ENV === 'production';

  const devTools = isProd ? null : (
    <DevTools/>
  );

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <StyleRoot>
        <Style rules={rules.body}/>
        {devTools}
        <NavigationContainer {...props}/>
        {props.children}
      </StyleRoot>
    </MuiThemeProvider>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default base(Body);
