import React, { PropTypes } from 'react';
import { pure } from 'recompose';

import { IconButton } from 'material-ui/lib';

import styles from './styles';

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

export default pure(MenuButton);
