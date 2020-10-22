import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import queryString from 'query-string';
import { matchPath } from 'react-router';
import withStyles from 'withstyles';
import { get } from 'lodash';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton';

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
    onTimeTravelDismissClick,
    onFullscreenCloseClick
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

  const renderFullscreenDismissButton = () => (
    <div className={computedStyles.fullscreenDismiss}>
      <IconButton aria-label='Exit fullscreen' onClick={onFullscreenCloseClick}>
        <FullscreenExit />
      </IconButton>
    </div>
  );

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

  const renderHeader = () => (
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

  return (
    <ReactCSSTransitionGroup
      transitionName='header'
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
      {fullscreen === 'true' ? null : renderHeader()}
      {fullscreen === 'true' ? renderFullscreenDismissButton() : null}
    </ReactCSSTransitionGroup>
  );
};

Header.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired,
    title: PropTypes.object.isRequired,
    menuButton: PropTypes.object.isRequired,
    fullscreenDismiss: PropTypes.object.isRequired,
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
    }),
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  onTimeTravelDismissClick: PropTypes.func.isRequired,
  onFullscreenCloseClick: PropTypes.func.isRequired,
  locations: PropTypes.array
};

Header.defaultProps = {
  locations: []
};

export default withStyles(stylesGenerator)(Header);
