import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';

import stylesGenerator from './styles';

const DrawerContentItem = ({
  computedStyles,
  className = '',
  onClick,
  icon,
  primary,
  secondary
}) => (
  <ListItem id='foo' className={computedStyles.base} onClick={onClick}>
    <Avatar onClick={onClick}>
      <span className={className}>
        <Icon>{icon}</Icon>
      </span>
    </Avatar>
    <ListItemText primary={primary} secondary={secondary} />
  </ListItem>
);

DrawerContentItem.propTypes = {
  computedStyles: PropTypes.shape({ base: PropTypes.object.isRequired }).isRequired,
  className: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  enabled: PropTypes.bool, // eslint-disable-line
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired
};

export default withStyles(stylesGenerator)(DrawerContentItem);
