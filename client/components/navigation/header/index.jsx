import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import withStyles from 'withstyles';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';

import { formatForDisplay } from 'utils';
import { MOBILE_WIDTH_BREAKPOINT } from 'components/common/styles';
import Responsive from 'components/common/responsive';
import HamburgerMenu from './hamburger-menu';
import LocationDropDown from './location-dropdown';
import stylesGenerator from './styles';

const Header = (props) => {
  const { computedStyles, location, locations, actions, siteNavOpen } = props;
  const { fullscreen } = queryString.parse(location.search);
  const toggleSiteNav = actions.emitToggleSiteNav.bind(null, !siteNavOpen);

  const renderLocationTab = (tabLocation, index) => {
    const onClick = () => actions.push({ ...location, pathname: `/${tabLocation}` });

    return (
      <Tab
        key={`${tabLocation}-${index}`}
        label={formatForDisplay(tabLocation)}
        value={locations.indexOf(tabLocation)}
        onClick={onClick}
        className={computedStyles.tab}/>
    );
  };

  return fullscreen === 'true' ? null : (
    <div className={computedStyles.base}>
      <Toolbar>
        <HamburgerMenu className={computedStyles.menuButton} toggleSiteNav={toggleSiteNav}/>
        <div className={computedStyles.title}>Office Insights</div>
        <Responsive
          mobileBreakpoint={MOBILE_WIDTH_BREAKPOINT}
          mobileAlt={<LocationDropDown {...props}/>}
          {...props}>
          <Tabs value={locations.indexOf(location.pathname)}>
            {locations.map(renderLocationTab)}
          </Tabs>
        </Responsive>
      </Toolbar>
    </div>
  );
};

Header.defaultProps = {
  location: {}
};

Header.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired,
    title: PropTypes.object.isRequired,
    menuButton: PropTypes.object.isRequired,
    tab: PropTypes.object.isRequired
  }).isRequired,
  siteNavOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitToggleSiteNav: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      fullscreen: PropTypes.string
    })
  }),
  locations: PropTypes.array
};

export default withStyles(stylesGenerator)(Header);
