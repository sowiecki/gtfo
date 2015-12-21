import moment from 'moment';

import setAlertForReservationStatus from './status/reservation';

const determineRoomStatus = (room, reservations, accessories) => {
  room.alert = setAlertForReservationStatus(reservations);

  return room;
};

export default determineRoomStatus;
