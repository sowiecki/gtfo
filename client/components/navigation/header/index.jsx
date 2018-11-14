import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { matchPath } from 'react-router';
import withStyles from 'withstyles';
import { get } from 'lodash';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';

import { formatForDisplay } from 'utils';
import { MOBILE_WIDTH_BREAKPOINT } from 'components/common/styles';
import Responsive from 'components/common/responsive';
import { FLOOR_PLAN_ROUTE } from 'client/constants';
import HamburgerMenu from './hamburger-menu';
import LocationDropDown from './location-dropdown';
import stylesGenerator from './styles';

const Header = (props) => {
  const {
    computedStyles,
    location,
    locations,
    actions,
    siteNavOpen,
    onTimeTravelDismissClick
  } = props;
  const { fullscreen } = queryString.parse(location.search);
  const toggleSiteNav = () => {
    onTimeTravelDismissClick();
    actions.emitToggleSiteNav(!siteNavOpen);
  };
  const params = get(
    matchPath(location.pathname, {
      path: FLOOR_PLAN_ROUTE,
      exact: true,
      strict: false
    }),
    'params'
  );

  if (!params) return null; // Controller will handle redirecting to a route with valid params

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
        <HamburgerMenu className={computedStyles.menuButton} toggleSiteNav={toggleSiteNav} />
        <div className={computedStyles.title}>Office Insights</div>
        <Responsive
          mobileBreakpoint={MOBILE_WIDTH_BREAKPOINT}
          mobileAlt={<LocationDropDown {...props} />}
          {...props}>
          <Tabs value={locations.indexOf(params.location)}>{locations.map(renderLocationTab)}</Tabs>
        </Responsive>
      </Toolbar>
    </div>
  );
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
  }).isRequired,
  onTimeTravelDismissClick: PropTypes.func.isRequired,
  locations: PropTypes.array
};

Header.defaultProps = {
  locations: []
};

export default withStyles(stylesGenerator)(Header);
