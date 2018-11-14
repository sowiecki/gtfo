/* global window */
import React from 'react';
import PropTypes from 'prop-types';

import NavigationContainer from '../navigation/container';

import './styles';

// https://material-ui.com/style/typography/#migration-to-typography-v2
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; // eslint-disable-line

const Body = (props) => <NavigationContainer {...props}>{props.children}</NavigationContainer>;

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default Body;
