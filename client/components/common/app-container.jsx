import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProdAppContainer = ({ children }) => <Fragment>{children}</Fragment>;

ProdAppContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const AppContainer =
  process.env.NODE_ENV === 'production'
    ? ProdAppContainer
    : require('react-hot-loader').AppContainer;

export default AppContainer;
