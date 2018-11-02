import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import stylesGenerator from './styles';

const RoomModal = ({ computedStyles, room }) => <div className={computedStyles.base}>{room}</div>;

RoomModal.propTypes = {
  computedStyles: PropTypes.shape({ base: PropTypes.object.isRequired }).isRequired,
  room: PropTypes.string.isRequired
};

export default withStyles(stylesGenerator)(RoomModal);
