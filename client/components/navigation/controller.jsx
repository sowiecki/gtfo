/* globals window, document */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { omit } from 'lodash';

import { FLOOR_PLAN_ROOT_ID } from 'constants';
import NavigationLayout from './layout';

class NavigationController extends PureComponent {
  static propTypes = {
    oauthResponse: PropTypes.shape({
      accessToken: PropTypes.string.isRequired,
      expiresOn: PropTypes.string.isRequired
    }),
    documentTitle: PropTypes.string.isRequired,
    deviceWidth: PropTypes.number.isRequired,
    siteNavOpen: PropTypes.bool.isRequired,
    timeTravelControlsOpen: PropTypes.bool.isRequired,
    timeTravelTime: PropTypes.string,
    timeSliderValue: PropTypes.number,
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
      emitModalContentUpdate: PropTypes.func.isRequired,
      emitOauthResponseUpdate: PropTypes.func.isRequired,
      emitDeviceWidthUpdate: PropTypes.func.isRequired,
      emitTimeTravelUpdate: PropTypes.func.isRequired,
      emitTimeTravelControlsToggle: PropTypes.func.isRequired,
      emitTimeSliderValueUpdate: PropTypes.func.isRequired,
      emitToggleSiteNav: PropTypes.func.isRequired,
      emitDisplayTempToggle: PropTypes.func.isRequired,
      emitTempScaleToggle: PropTypes.func.isRequired
    }).isRequired,
    locations: PropTypes.array,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired
    }).isRequired,
    children: PropTypes.node.isRequired,
    modalContent: PropTypes.node
  };

  componentWillMount() { // eslint-disable-line
    const { actions, oauthResponse } = this.props;
    window.addEventListener('resize', actions.emitDeviceWidthUpdate);

    // `oauthResponse` originates from outside the React app,
    // so it must be manually loaded into the Redux store
    if (oauthResponse) {
      actions.emitOauthResponseUpdate(oauthResponse);
    }
  }

  componentWillReceiveProps({ documentTitle }) { // eslint-disable-line
    document.title = documentTitle;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.actions.emitDeviceWidthUpdate);
  }

  shouldBlur = () => {
    const { modalContent, siteNavOpen } = this.props;

    return !!modalContent || siteNavOpen;
  };

  // Closes modals, drawers, etc.
  handleCloseEverything = ({ target }) => {
    const { actions } = this.props;

    if (this.shouldBlur()) {
      actions.emitToggleSiteNav(false);
      actions.emitTimeSliderValueUpdate(0);

      if (target.id === FLOOR_PLAN_ROOT_ID) {
        actions.emitModalContentUpdate(null);
        actions.emitTimeTravelControlsToggle(false);
      }
    }
  };

  handleViewFutureAvailabilitiesClick = () => {
    const { actions, timeTravelControlsOpen } = this.props;

    actions.emitTimeTravelControlsToggle(!timeTravelControlsOpen);
    actions.emitToggleSiteNav(false);
  };

  handleFullscreenOpenClick = () => {
    const { actions, location } = this.props;
    const fullScreenParams = {
      ...location,
      search: queryString.stringify({
        fullscreen: true,
        ...queryString.parse(location.search)
      })
    };

    actions.push(fullScreenParams);
  };

  handleFullscreenCloseClick = () => {
    const { actions, location } = this.props;
    const params = {
      ...location,
      search: queryString.stringify(omit(queryString.parse(location.search), 'fullscreen'))
    };

    actions.push(params);
  };

  handleTimeTravelDismissClick = () => {
    const { actions } = this.props;

    actions.emitTimeTravelControlsToggle(false);
    actions.emitTimeTravelUpdate(null);
    actions.emitTimeSliderValueUpdate(0);
  };

  render() {
    return (
      <NavigationLayout
        {...this.props}
        shouldBlur={this.shouldBlur()}
        onCloseEverything={this.handleCloseEverything}
        onViewFutureAvailabilitiesClick={this.handleViewFutureAvailabilitiesClick}
        onFullscreenOpenClick={this.handleFullscreenOpenClick}
        onFullscreenCloseClick={this.handleFullscreenCloseClick}
        onTimeTravelDismissClick={this.handleTimeTravelDismissClick}>
        {this.props.children}
      </NavigationLayout>
    );
  }
}

export default NavigationController;
