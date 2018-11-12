/* globals window, document */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import NavigationLayout from './layout';

class NavigationController extends PureComponent {
  static propTypes = {
    documentTitle: PropTypes.string.isRequired,
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
      emitToggleDisplayLegend: PropTypes.func.isRequired,
      emitToggleDisplayTemp: PropTypes.func.isRequired,
      emitToggleTempScale: PropTypes.func.isRequired
    }).isRequired,
    locations: PropTypes.array,
    modalContent: PropTypes.node
  };

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
    const { actions, locations, location, timeTravelControlsOpen } = this.props;
    const fullScreenParams = {
      ...location,
      search: queryString.stringify({
        fullscreen: true,
        ...queryString.parse(location.search)
      })
    };

    // Grouped action props.
    const onViewFutureAvailabilitiesClick = () => {
      actions.emitTimeTravelControlsToggle(!timeTravelControlsOpen);
      actions.emitToggleSiteNav(false);
    };
    const onOpenFullscreenClick = () => actions.push(fullScreenParams);
    const onTimeTravelDismissClick = () => {
      actions.emitTimeTravelControlsToggle(!timeTravelControlsOpen);
      actions.emitTimeTravelUpdate(null);
      actions.emitTimeSliderValueUpdate(0);
    };

    return !locations ? null : (
      <NavigationLayout
        {...this.props}
        onViewFutureAvailabilitiesClick={onViewFutureAvailabilitiesClick}
        onOpenFullscreenClick={onOpenFullscreenClick}
        onTimeTravelDismissClick={onTimeTravelDismissClick}/>
    );
  }
}

export default NavigationController;
