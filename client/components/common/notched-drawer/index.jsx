import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import Icon from '@material-ui/core/Icon';

import stylesGenerator from './styles';

/**
 * Semi-generic drawer-with-a-notch component.
 * Could be improved by not having static height values,
 * which would make it more flexible for displaying diverse content.
 */
const NotchedDrawer = ({ computedStyles, onClick, children }) => (
  <div className={computedStyles.base}>
    <button className={computedStyles.notchButton} onClick={onClick} type='button'>
      <Icon>keyboard_arrow_up</Icon>
    </button>
    <div className={computedStyles.children}>{children}</div>
  </div>
);

NotchedDrawer.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired,
    notch: PropTypes.object.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired // eslint-disable-line
};

export default withStyles(stylesGenerator)(NotchedDrawer);
