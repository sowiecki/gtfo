import React from 'react';
import PropTypes from 'prop-types';

import NavigationContainer from '../navigation/container';

import './styles';

const Body = (props) => <NavigationContainer {...props}>{props.children}</NavigationContainer>;

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default Body;
