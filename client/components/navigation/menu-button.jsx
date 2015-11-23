import React from 'react';

import { IconButton } from 'material-ui/lib';

const MenuButton = ({ toggleNav }) => {
  return (
    <IconButton
      className='light-on-dark'
      onClick={toggleNav}>
        <i className="material-icons">menu</i>
    </IconButton>
  );
};

export default MenuButton;
