import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import { find, isEqual } from 'lodash';

import { FLOOR_PLAN_ROUTE, PROP_TYPES } from 'client/constants';
import RoomModal from './index';

/**
 * Special component used to trigger the RoomModal component from a ReactRouter change.
 */
class RoomModalTrigger extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    actions: PropTypes.shape({
      emitModalContentUpdate: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
    }).isRequired,
    /* eslint-disable */
    meetingRooms: PropTypes.arrayOf(PROP_TYPES.meetingRoom.isRequired)
    /* eslint-enable */
  };

  componentDidMount() {
    this.triggerRoomModal();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.getMeetingRoom(), this.getMeetingRoom(nextProps));
  }

  componentWillUpdate(nextProps) { // eslint-disable-line
    this.triggerRoomModal(nextProps);
  }

  componentWillUnmount() {
    this.closeModal();
  }

  getLocationParams = () =>
    matchPath(this.props.location.pathname, {
      path: FLOOR_PLAN_ROUTE,
      exact: true,
      strict: false
    }).params;

  getMeetingRoom = (props = this.props) =>
    find(props.meetingRooms, { id: this.getLocationParams().room });

  closeModal = () => {
    const { actions, location } = this.props;

    const params = this.getLocationParams();

    actions.emitModalContentUpdate(null);
    actions.push({ ...location, pathname: `/${params.location}` });
  };

  triggerRoomModal = (nextProps) => {
    const { actions } = this.props;
    const meetingRoom = this.getMeetingRoom(nextProps);

    if (meetingRoom) {
      actions.emitModalContentUpdate(
        <RoomModal meetingRoom={meetingRoom} closeModal={this.closeModal} />
      );
    }
  };

  render() {
    return null;
  }
}

export default RoomModalTrigger;
