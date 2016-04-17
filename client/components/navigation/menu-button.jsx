import React, { PropTypes } from 'react';

import { IconButton } from 'material-ui';

import { base } from '../../config/composition';
import { styles } from './styles';

const MenuButton = ({ toggleSiteNav }) => (
  <IconButton
    style={styles.menuButton}
    onClick={toggleSiteNav}>
      <i className='material-icons'>menu</i>
  </IconButton>
);

MenuButton.propTypes = {
  toggleSiteNav: PropTypes.func.isRequired
};

export default base(MenuButton);
