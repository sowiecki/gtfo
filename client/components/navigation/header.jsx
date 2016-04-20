import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';

import Tab from 'material-ui/Tabs/Tab';
import Tabs from 'material-ui/Tabs/Tabs';
import Toolbar from 'material-ui/Toolbar';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';

import MenuButton from './menu-button';

import { formatForDisplay } from '../../utils';
import { applyStyles } from '../../config/composition';
import { styles } from './styles';

const Header = ({ params, location, locations, actions, navigation }) => {
  const { anchor, fullscreen } = location.query;
  const { siteNavOpen } = navigation.toJS();
  const toggleSiteNav = actions.emitSiteNavToggle.bind(null, !siteNavOpen);

  const renderLocationTab = (tabLocation, index) => (
    <Tab
      key={`${tabLocation}-${index}`}
      label={formatForDisplay(tabLocation)}
      value={locations.indexOf(tabLocation)}
      onClick={actions.emitLocationIndexUpdate.bind(null, tabLocation, anchor)}
      style={styles.toolbarTab}/>
  );

  return fullscreen === 'true' ? null : (
    <Toolbar style={styles.toolbar}>
      <ToolbarGroup firstChild={true}>
        <MenuButton toggleSiteNav={toggleSiteNav}/>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text='Office Insight' style={styles.toolbarTitle}/>
      </ToolbarGroup>
      <ToolbarGroup style={styles.toolbarTabs}>
        <Tabs
          value={locations.indexOf(params.location)}>
            {locations.map(renderLocationTab)}
        </Tabs>
      </ToolbarGroup>
    </Toolbar>
  );
};

Header.propTypes = {
  actions: PropTypes.shape({
    emitSiteNavToggle: PropTypes.func.isRequired
  }).isRequired,
  navigation: ImmutablePropTypes.Map.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      fullscreen: PropTypes.string
    })
  }),
  params: PropTypes.object.isRequired,
  locations: PropTypes.array
};

export default applyStyles(Header);
