import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';
import moment from 'moment';

import { TIME_FORMAT, BOOKED, ABANDONED } from 'client/constants';
import { formatForDisplay } from 'utils';
import FutureReservations from './future-reservations';
import stylesGenerator from './styles';

const RoomModal = ({ computedStyles, meetingRoom, closeModal }) => {
  const renderCurrentReservation = () =>
    ([BOOKED, ABANDONED].includes(meetingRoom.alert) ? (
      <div className={computedStyles.currentReservation}>
        {moment(meetingRoom.currentReservation.startDate).format(TIME_FORMAT)} to{' '}
        {moment(meetingRoom.currentReservation.endDate).format(TIME_FORMAT)}
        <div>RESERVED BY: {meetingRoom.currentReservation.email}</div>
      </div>
    ) : null);

  return (
    <Fragment>
      <div className={computedStyles.base}>
        <h1>{meetingRoom.name}</h1>
        <div className={computedStyles.status(meetingRoom.alert)}>
          {meetingRoom.alert.replace(/_/g, ' ')}
          {renderCurrentReservation()}
        </div>
        <FutureReservations reservations={meetingRoom.reservations} />
      </div>
      <div className={computedStyles.footer}>
        <button type='button' onClick={closeModal}>
          View {formatForDisplay(meetingRoom.location)}
        </button>
      </div>
    </Fragment>
  );
};

RoomModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired,
    status: PropTypes.func.isRequired,
    currentReservation: PropTypes.object.isRequired,
    footer: PropTypes.object.isRequired
  }).isRequired,
  meetingRoom: PropTypes.shape({
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
    currentReservation: PropTypes.shape({
      email: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired
    }).isRequired,
    reservations: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    thermo: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(stylesGenerator)(RoomModal);
