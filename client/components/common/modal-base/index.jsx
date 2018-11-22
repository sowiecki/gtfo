import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import stylesGenerator from './styles';

const ModalBase = ({ computedStyles, children }) => (
  <div className={computedStyles.base}>{children}</div>
);

ModalBase.propTypes = {
  children: PropTypes.node.isRequired,
  computedStyles: PropTypes.shape({
    base: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(stylesGenerator)(ModalBase);
