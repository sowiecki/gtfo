import React, { PropTypes } from 'react';
import history from '../../config/history';

import FontIcon from 'material-ui/lib/font-icon';
import { List, ListItem } from 'material-ui/lib/lists';

import { base } from '../../config/composition';
import { styles } from './styles';

const LeftNavContent = ({ location, toggleLocationModal, toggleSiteNav }) => (
  <List>
    <ListItem
      onClick={toggleLocationModal}
      leftIcon={<FontIcon className='material-icons' style={styles.navIcons}>place</FontIcon>}
      primaryText='Edit Location'/>
    <ListItem
      onClick={() => history.replaceState(null, `/${location}/fullscreen`)}
      leftIcon={<FontIcon className='material-icons' style={styles.navIcons}>fullscreen</FontIcon>}
      primaryText='Open fullscreen'/>
    <ListItem
      onClick={toggleSiteNav}
      leftIcon={<FontIcon className='material-icons' style={styles.navIcons}>clear</FontIcon>}
      primaryText='Close'/>
  </List>
);

LeftNavContent.propTypes = {
  location: PropTypes.string,
  toggleLocationModal: PropTypes.func.isRequired,
  toggleSiteNav: PropTypes.func.isRequired
};

export default base(LeftNavContent);
