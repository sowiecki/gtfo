import React, { PropTypes } from 'react';

import { IconButton } from 'material-ui/lib';

import { base } from '../../config/composition';
import { styles } from './styles';

const MenuButton = ({ toggleSiteNavOpen }) => {
  return (
    <IconButton
      style={styles.menuButton}
      onClick={toggleSiteNavOpen}>
        <i className='material-icons'>menu</i>
    </IconButton>
  );
};

MenuButton.propTypes = {
  toggleSiteNavOpen: PropTypes.func.isRequired
};

export default base(MenuButton);
