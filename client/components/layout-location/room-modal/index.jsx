import React from 'react';
import PropTypes from 'prop-types';

const RoomModal = ({ room }) => <div>{room}</div>;

RoomModal.propTypes = {
  room: PropTypes.string.isRequired
};

export default RoomModal;
