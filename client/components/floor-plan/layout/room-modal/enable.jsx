import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import { find, isEqual } from 'lodash';

import { FLOOR_PLAN_ROUTE } from 'client/constants';
import RoomModal from './index';

/**
 * Special component used to trigger the RoomModal component from a ReactRouter change.
 */
class RoomModalEnable extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    actions: PropTypes.shape({
      emitModalContentUpdate: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
    }).isRequired,
    /* eslint-disable */
    meetingRooms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        coordinates: PropTypes.shape({
          height: PropTypes.number.isRequired,
          width: PropTypes.number.isRequired,
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
        }).isRequired,
        location: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        currenReservation: PropTypes.shape({
          email: PropTypes.string.isRequired,
          startDate: PropTypes.string.isRequired,
          endDate: PropTypes.string.isRequired
        }),
        thermo: PropTypes.shape({
          f: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          c: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
      }).isRequired
    )
    /* eslint-enable */
  };

  componentDidMount() {
    this.modalUpdate();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.getMeetingRoom(), this.getMeetingRoom(nextProps));
  }

  componentDidUpdate() {
    this.modalUpdate();
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

  modalUpdate = () => {
    const { actions } = this.props;
    const meetingRoom = this.getMeetingRoom();

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

export default RoomModalEnable;
