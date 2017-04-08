import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import Tab from 'material-ui/Tabs/Tab';
import Tabs from 'material-ui/Tabs/Tabs';
import Toolbar from 'material-ui/Toolbar';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';

import Responsive from '../common/responsive';
import MenuButton from './menu-button';
import LocationDropDown from './location-dropdown';

import { styles } from './styles';
import { MOBILE_WIDTH_BREAKPOINT } from '../common/styles';
import { formatForDisplay } from '../../utils';
import { applyStyles } from '../../config/composition';

const Header = (props) => {
  const { location, locations, actions, siteNavOpen } = props;
  const { fullscreen } = queryString.parse(location.search);
  const toggleSiteNav = actions.emitToggleSiteNav.bind(null, !siteNavOpen);

  const renderLocationTab = (tabLocation, index) => {
    const onClick = () => actions.emitLocationUpdate(tabLocation, location);

    return (
      <Tab
        key={`${tabLocation}-${index}`}
        label={formatForDisplay(tabLocation)}
        value={locations.indexOf(tabLocation)}
        onClick={onClick}
        style={styles.toolbarTab}/>
    );
  };

  return fullscreen === 'true' ? null : (
    <Toolbar style={styles.toolbar}>
      <ToolbarGroup firstChild={true}>
        <MenuButton toggleSiteNav={toggleSiteNav}/>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text='Office Insight' style={styles.toolbarTitle}/>
      </ToolbarGroup>
      <ToolbarGroup style={styles.toolbarTabs}>
        <Responsive
          mobileBreakpoint={MOBILE_WIDTH_BREAKPOINT}
          mobileAlt={<LocationDropDown {...props}/>}
          {...props}>
            <Tabs value={locations.indexOf(location.pathname.replace('/', ''))}>
              {locations.map(renderLocationTab)}
            </Tabs>
        </Responsive>
      </ToolbarGroup>
    </Toolbar>
  );
};

Header.defaultProps = {
  location: {}
};

Header.propTypes = {
  siteNavOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitToggleSiteNav: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      fullscreen: PropTypes.string
    })
  }),
  locations: PropTypes.array
};

export default applyStyles(Header);
