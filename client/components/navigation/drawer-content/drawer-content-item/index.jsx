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
  enabled = true,
  primary
}) => (
  <ListItem onClick={onClick}>
    <Avatar onClick={onClick}>
      <span className={className}>
        <Icon>{icon}</Icon>
      </span>
    </Avatar>
    <ListItemText className={enabled ? null : computedStyles.fadedIcon} primary={primary}/>
  </ListItem>
);

DrawerContentItem.propTypes = {
  computedStyles: PropTypes.shape({ fadedIcon: PropTypes.object.isRequired }).isRequired,
  className: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  enabled: PropTypes.bool,
  primary: PropTypes.string.isRequired
};

export default withStyles(stylesGenerator)(DrawerContentItem);
