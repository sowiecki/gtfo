import React from 'react';
import PropTypes from 'prop-types';
import { StyleRoot, Style } from 'radium';

import NavigationContainer from './navigation/container';

import { provideMuiTheme, base } from '../config/composition';
import { rules } from './common/styles';

const Body = (props) => provideMuiTheme(
  <StyleRoot>
    <Style rules={rules.body}/>
    <NavigationContainer {...props}/>
    {props.children}
  </StyleRoot>
);

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default base(Body);
