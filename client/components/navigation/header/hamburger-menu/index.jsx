import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import IconButton from '@material-ui/core/IconButton';

import stylesGenerator from './styles';

const HamburgerMenu = ({ toggleSiteNav, computedStyles }) => (
  <IconButton className={computedStyles.base} onClick={toggleSiteNav}>
    <i className='material-icons'>menu</i>
  </IconButton>
);

HamburgerMenu.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.string.isRequired
  }).isRequired,
  toggleSiteNav: PropTypes.func.isRequired
};

export default withStyles(stylesGenerator)(HamburgerMenu);
