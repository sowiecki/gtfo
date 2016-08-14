/* globals setInterval, clearInterval */
import React, { Component, PropTypes } from 'react';
import { Style } from 'radium';

import Paper from 'material-ui/Paper';
import SwipeableViews from 'react-swipeable-views';

import DisplayError from '../common/display-error';
import MapLegend from './map-legend';

import Location from './location';

import history from '../../config/history';
import { applyStyles } from '../../config/composition';
import { styles, rules } from './styles';
import { pluckLocations, hasAnchor } from '../../utils';
import { PING_TIMEOUT } from '../../constants';

let originalLocation;

class LayoutController extends Component {
  componentDidMount() {
    if (this.props.ping) {
      this.flashPing();
    }
  }

  /**
   * Forces default location parameter to first location.
   */
  componentDidUpdate() {
    const { meetingRooms, ping, params } = this.props;
    const locations = pluckLocations(meetingRooms);

    if (!params.location && locations.length) {
      history.push({ pathname: locations[0] });
    }

    if (ping) {
      this.flashPing();
    }
  }

  /**
   * Checks that view is on correct location for ping.
   * Automatically clears pings after defined amount of time.
   */
  flashPing() {
    const { actions, params, location, ping } = this.props;

    // Save original location.
    originalLocation = originalLocation || params.location;

    if (params.location !== ping.location) {
      history.push({
        pathname: ping.location,
        query: { ...location.query }
      });
    }

    const setPingTimeout = setInterval(() => {
      actions.emitClearPing();

      // Revert to original location and re-save.
      history.push({
        pathname: originalLocation,
        query: { ...location.query }
      });

      originalLocation = params.location;

      clearInterval(setPingTimeout);
    }, PING_TIMEOUT);
  }

  handleChangeLocation(newIndex) {
    const { meetingRooms, location } = this.props;
    const locations = pluckLocations(meetingRooms);

    history.push({
      pathname: locations[newIndex],
      query: { ...location.query }
    });
  }

  render() {
    const { meetingRooms, displayLegend, params, location } = this.props;
    const locationKeys = pluckLocations(meetingRooms);

    const renderLocation = (locationKey, index) => (
      <Location key={index} locationKey={locationKey} {...this.props}/>
    );

    return (
      <span>
        <Style rules={rules.officeLayout}/>
        <Paper style={styles.paperOverride} zDepth={1}>
          <SwipeableViews
            className='swipeable-viewport'
            style={styles.swipableOverride}
            index={locationKeys.indexOf(params.location)}
            onChangeIndex={this.handleChangeLocation.bind(this)}
            resistance={true}>
              {locationKeys.map(renderLocation)}
          </SwipeableViews>
          <MapLegend
            enabled={displayLegend}
            showYouAreHere={hasAnchor(location)}/>
        </Paper>
        <DisplayError {...this.props}/>
      </span>
    );
  }
}

LayoutController.propTypes = {
  location: PropTypes.object.isRequired,
  meetingRooms: PropTypes.array,
  stalls: PropTypes.array,
  markers: PropTypes.array,
  displayLegend: PropTypes.bool.isRequired,
  displayTemp: PropTypes.bool.isRequired,
  unitOfTemp: PropTypes.string.isRequired,
  params: PropTypes.shape({
    location: PropTypes.string
  }).isRequired,
  ping: PropTypes.object,
  actions: PropTypes.shape({
    emitClearPing: PropTypes.func.isRequired
  }).isRequired
};

export default applyStyles(LayoutController);
