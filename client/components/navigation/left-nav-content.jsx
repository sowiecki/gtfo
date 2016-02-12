import React, { PropTypes } from 'react';
import history from '../../config/history';

import FontIcon from 'material-ui/lib/font-icon';
import { List, ListItem } from 'material-ui/lib/lists';

import { base } from '../../config/composition';
import { styles } from './styles';

const LeftNavContent = ({ toggleSiteNavOpen }) => (
  <List>
    <ListItem
      onClick={() => history.replaceState(null, '/fullscreen')}
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

export default base(LeftNavContent);
