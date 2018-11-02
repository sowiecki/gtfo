import React from 'react';
import PropTypes from 'prop-types';
import { StyleRoot } from 'radium';

import NavigationContainer from '../navigation/container';

import { provideMuiTheme } from '../../config/composition';
import './styles';

const Body = (props) => provideMuiTheme(
  <StyleRoot>
    <NavigationContainer {...props}/>
    {props.children}
  </StyleRoot>
);

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default Body;
