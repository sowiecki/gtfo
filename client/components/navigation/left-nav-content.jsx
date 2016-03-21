import React, { PropTypes } from 'react';
import history from '../../config/history';

import FontIcon from 'material-ui/lib/font-icon';
import { List, ListItem } from 'material-ui/lib/lists';

import { base } from '../../config/composition';
import { styles } from './styles';

const LeftNavContent = (props) => {
  const { location, toggleLocationModal, toggleSiteNav } = props;
  const fullScreenParams = {
    pathname: location.pathname,
    query: {
      fullscreen: true,
      ...location.query
    }
  };

  const placeIcon = (
    <FontIcon className='material-icons' style={styles.navIcons}>place</FontIcon>
  );

  const fullscreenIcon = (
    <FontIcon className='material-icons' style={styles.navIcons}>fullscreen</FontIcon>
  );

  const closeIcon = (
    <FontIcon className='material-icons' style={styles.navIcons}>clear</FontIcon>
  );

  return (
    <List>
      <ListItem
        onClick={toggleLocationModal}
        leftIcon={placeIcon}
        primaryText='Edit Location'/>
      <ListItem
        onClick={() => history.push(fullScreenParams)}
        leftIcon={fullscreenIcon}
        primaryText='Open fullscreen'/>
      <ListItem
        onClick={toggleSiteNav}
        leftIcon={closeIcon}
        primaryText='Close'/>
    </List>
  );
};

LeftNavContent.propTypes = {
  location: PropTypes.object,
  toggleLocationModal: PropTypes.func.isRequired,
  toggleSiteNav: PropTypes.func.isRequired
};

export default base(LeftNavContent);
