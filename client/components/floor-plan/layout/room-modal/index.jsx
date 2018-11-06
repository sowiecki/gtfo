import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import stylesGenerator from './styles';

const RoomModal = ({ computedStyles, meetingRoom, closeModal }) => (
  <div className={computedStyles.base}>
    <button type='button' onClick={closeModal}>
      Close
    </button>
    <ul>
      <li>{meetingRoom.name}</li>
      <li>{meetingRoom.alert}</li>
      <li>{meetingRoom.location}</li>
      <li>{JSON.stringify(meetingRoom.currentReservation)}</li>
    </ul>
  </div>
);

RoomModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  computedStyles: PropTypes.shape({ base: PropTypes.object.isRequired }).isRequired,
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
    thermo: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(stylesGenerator)(RoomModal);
