import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import history from '../../config/history';

import FontIcon from 'material-ui/lib/font-icon';
import { List, ListItem } from 'material-ui/lib/lists';

import styles from './styles';

const LeftNavContent = ({ toggleSiteNavOpen }) => (
  <List>
    <ListItem
      onClick={() => history.replaceState(null, '/map')}
      leftIcon={<FontIcon className='material-icons' style={styles.navIcons}>fullscreen</FontIcon>}
      primaryText='Open fullscreen'/>
    <ListItem
      onClick={toggleSiteNavOpen}
      leftIcon={<FontIcon className='material-icons' style={styles.navIcons}>clear</FontIcon>}
      primaryText='Close'/>
  </List>
);

LeftNavContent.propTypes = {
  toggleSiteNavOpen: PropTypes.func.isRequired
};

export default pure(LeftNavContent);
