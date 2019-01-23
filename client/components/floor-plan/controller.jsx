/* globals setInterval, clearInterval */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { omit } from 'lodash';

import { PING_TIMEOUT } from 'client/constants';
import { pluckLocations } from 'utils';
import FloorPlanLayout from './layout';

/*
 * References and checks used to maintain the default location.
 * The default location should always be the last location manually navigated to by a user.
 * Pings should NOT change the default location.
 */
let originalLocation;
let noPingInProgress = true;

class FloorPlanController extends PureComponent {
  static propTypes = {
    oauthResponse: PropTypes.shape({
      accessToken: PropTypes.string.isRequired,
      expiresOn: PropTypes.string.isRequired
    }),
    location: PropTypes.object.isRequired,
    meetingRooms: PropTypes.array,
    stalls: PropTypes.array,
    markers: PropTypes.array,
    displayLegend: PropTypes.bool.isRequired,
    displayTemp: PropTypes.bool.isRequired,
    enableMotion: PropTypes.bool.isRequired,
    enableStalls: PropTypes.bool.isRequired,
    unitOfTemp: PropTypes.string.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        location: PropTypes.string
      }).isRequired
    }),
    ping: PropTypes.object,
    actions: PropTypes.shape({
      emitPingClear: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    }).isRequired
  };

  componentWillMount() {
    const { actions, location, oauthResponse } = this.props;
    const { anchor } = queryString.parse(location.search);

    actions.connectSocket({ anchor, oauthResponse });

    this.flushAuthParams();
  }

  componentDidMount() {
    if (this.props.ping) {
      this.flashPing();
    }
  }

  /**
   * Forces default location parameter to first location.
   */
  componentDidUpdate() {
    const { location, meetingRooms, ping, actions } = this.props;
    const locations = pluckLocations(meetingRooms);

    if (!location.pathname && locations.length) {
      actions.push({ ...location, pathname: locations[0] });
    }

    if (ping && noPingInProgress) {
      this.flashPing();
      noPingInProgress = false;
    }
  }

  /**
   * No longer needed at this stage of the app flow
   */
  flushAuthParams = () => {
    if (process.env.HEADLESS_AUTH) return;

    const { location, actions } = this.props;

    const search = queryString.stringify(
      omit(
        {
          ...queryString.parse(location.search)
        },
        'code',
        'session_state'
      )
    );

    actions.replace({ ...location, search });
  };

  // Similar to NavigationController.handleTimeTravelDismissClick
  handleLayoutReset = () => {
    const { actions } = this.props;

    actions.emitTimeTravelControlsToggle(false);
    actions.emitTimeTravelUpdate(null);
    actions.emitTimeSliderValueUpdate(0);
  };

  handleChangeLocation = (newIndex) => {
    const { actions, meetingRooms, location } = this.props;
    const locations = pluckLocations(meetingRooms);

    actions.push({ ...location, pathname: `/${locations[newIndex]}` });
  };

  /**
   * Checks that view is on correct location for ping.
   * Automatically clears pings after defined amount of time.
   */
  flashPing() {
    const { actions, location, ping } = this.props;

    // Save original location.
    originalLocation = originalLocation || location.pathname;

    if (location.pathname !== ping.location) {
      actions.push({ ...location, pathname: `/${ping.location}` });
    }

    const setPingTimeout = setInterval(() => {
      actions.emitPingClear();

      // Revert to original location and re-save.
      actions.push({ ...location, pathname: `/${originalLocation}` });

      originalLocation = location.pathname;
      noPingInProgress = true;

      clearInterval(setPingTimeout);
    }, PING_TIMEOUT);
  }

  render() {
    return (
      <FloorPlanLayout
        {...this.props}
        onLayoutReset={this.handleLayoutReset}
        onChangeIndex={this.handleChangeLocation}/>
    );
  }
}

export default FloorPlanController;
