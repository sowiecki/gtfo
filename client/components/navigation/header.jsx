import React, { PropTypes } from 'react';

import Tab from 'material-ui/Tabs/Tab';
import Tabs from 'material-ui/Tabs/Tabs';
import Toolbar from 'material-ui/Toolbar';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import MenuButton from './menu-button';
import Responsive from '../common/responsive';

import { MOBILE_WIDTH_BREAKPOINT } from '../common/styles';
import { formatForDisplay } from '../../utils';
import { applyStyles } from '../../config/composition';
import { styles } from './styles';

const Header = (props) => {
  const { params, location, locations, actions, siteNavOpen } = props;
  const { anchor, fullscreen } = location.query;
  const toggleSiteNav = actions.emitToggleSiteNav.bind(null, !siteNavOpen);

  const renderLocationTab = (tabLocation, index) => (
    <Tab
      key={`${tabLocation}-${index}`}
      label={formatForDisplay(tabLocation)}
      value={locations.indexOf(tabLocation)}
      onClick={actions.emitLocationIndexUpdate.bind(null, tabLocation, anchor)}
      style={styles.toolbarTab}/>
  );

  const renderLocationSelection = (renderedLocation, index) => (
    <MenuItem
      key={index}
      value={index}
      primaryText={formatForDisplay(renderedLocation)}
      onClick={actions.emitLocationIndexUpdate}/>
  );

  const locationsDropDown = (
    <SelectField
      value={locations.indexOf(params.location)}
      onChange={() => {}}
      floatingLabelText='Select a Location'>
        {locations.map(renderLocationSelection)}
    </SelectField>
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
        <Responsive
          mobileBreakpoint={MOBILE_WIDTH_BREAKPOINT}
          mobileAlt={locationsDropDown}
          {...props}>
            <Tabs value={locations.indexOf(params.location)}>
              {locations.map(renderLocationTab)}
            </Tabs>
        </Responsive>
      </ToolbarGroup>
    </Toolbar>
  );
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
  params: PropTypes.object.isRequired,
  locations: PropTypes.array
};

export default applyStyles(Header);
