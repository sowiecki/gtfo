import React, { Component, PropTypes } from 'react';
import { Style } from 'radium';

import Drawer from 'material-ui/Drawer';

import Header from './header';
import DrawerContent from './drawer-content';
import TimeTravel from './time-travel';

import history from '../../config/history';
import { base } from '../../config/composition';
import { rules, LEFT_HAND_NAV_WIDTH } from './styles';

class NavigationController extends Component {
  componentWillMount() {
    window.addEventListener('resize', this.props.actions.emitDeviceWidthUpdate);
  }

  componentWillReceiveProps({ documentTitle }) {
    document.title = documentTitle;
  }

  componentWillUnmount() {
    window.remoteEventListener('resize', this.props.actions.emitDeviceWidthUpdate);
  }

  render() {
    const { actions,
            locations,
            timeTravelControlsOpen,
            siteNavOpen } = this.props;
    const fullScreenParams = {
      pathname: location.pathname,
      query: {
        fullscreen: true,
        ...location.query
      }
    };

    // Grouped action props.
    const onViewFutureAvailabilitiesClick = () => {
      actions.emitTimeTravelControlsToggle(!timeTravelControlsOpen);
      actions.emitToggleSiteNav(false);
    };
    const onOpenFullscreenClick = () => history.push(fullScreenParams);
    const onTimeTravelDismissClick = () => {
      actions.emitTimeTravelControlsToggle(!timeTravelControlsOpen);
      actions.emitTimeTravelUpdate(null);
      actions.emitTimeSliderValueUpdate(0);
    };
    const onSelectFieldChange = () => {};

    return !locations ? null : (
      <div>
        <Style rules={rules.navigation}/>
        <Header
          onSelectFieldChange={onSelectFieldChange}
          {...this.props}/>
        <Drawer
          open={siteNavOpen}
          onRequestChange={actions.emitToggleSiteNav.bind(null, !siteNavOpen)}
          docked={false}
          width={LEFT_HAND_NAV_WIDTH}>
            <DrawerContent
              onViewFutureAvailabilitiesClick={onViewFutureAvailabilitiesClick}
              onOpenFullscreenClick={onOpenFullscreenClick}
              {...this.props}/>
        </Drawer>
        <TimeTravel
          onTimeTravelDismissClick={onTimeTravelDismissClick}
          {...this.props}/>
      </div>
    );
  }
}

NavigationController.propTypes = {
  deviceWidth: PropTypes.number.isRequired,
  siteNavOpen: PropTypes.bool.isRequired,
  timeTravelControlsOpen: PropTypes.bool.isRequired,
  timeTravelTime: PropTypes.string,
  timeSliderValue: PropTypes.number,
  actions: PropTypes.shape({
    emitDeviceWidthUpdate: PropTypes.func.isRequired,
    emitTimeTravelUpdate: PropTypes.func.isRequired,
    emitTimeTravelControlsToggle: PropTypes.func.isRequired,
    emitTimeSliderValueUpdate: PropTypes.func.isRequired,
    emitToggleSiteNav: PropTypes.func.isRequired,
    emitLocationUpdate: PropTypes.func.isRequired,
    emitToggleDisplayLegend: PropTypes.func.isRequired,
    emitToggleDisplayTemp: PropTypes.func.isRequired,
    emitToggleTempScale: PropTypes.func.isRequired
  }).isRequired,
  locations: PropTypes.array
};

export default base(NavigationController);
