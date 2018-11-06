import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import { find, isEqual } from 'lodash';

import { FLOOR_PLAN_ROUTE } from 'client/constants';
import RoomModal from './index';

class RoomModalEnable extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    actions: PropTypes.shape({
      emitModalContentUpdate: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
    }).isRequired,
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
  };

  componentDidMount() {
    this.modalUpdate();
  }

  shouldComponentUpdate(nextProps) {
    const { meetingRooms } = this.props;

    return !isEqual(meetingRooms, nextProps.meetingRooms);
  }

  componentDidUpdate() {
    this.modalUpdate();
  }

  componentWillUnmount(nextProps) {
    this.closeModal(nextProps);
  }

  getParams = () =>
    matchPath(this.props.location.pathname, {
      path: FLOOR_PLAN_ROUTE,
      exact: true,
      strict: false
    }).params;

  closeModal = () => {
    const { actions } = this.props;
    const params = this.getParams();

    actions.emitModalContentUpdate(null);
    actions.push(`/${params.location}`);
  };

  getMeetingRoom = (nextProps = this.props) => {
    const { meetingRooms } = nextProps;
    const params = this.getParams();

    return find(meetingRooms, { id: params.room });
  };

  modalUpdate = () => {
    const { actions } = this.props;
    const meetingRoom = this.getMeetingRoom();

    if (meetingRoom) {
      actions.emitModalContentUpdate(
        <RoomModal {...this.props} meetingRoom={meetingRoom} closeModal={this.closeModal} />
      );
    }
  };

  render() {
    return null;
  }
}

export default RoomModalEnable;
