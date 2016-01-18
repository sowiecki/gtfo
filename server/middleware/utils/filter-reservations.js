/**
 * Filter out expired reservations
 *
 * A reservation is considered "expired" if
 * both its start and end date are in the past.
 */

import moment from 'moment';
import filter from 'lodash/collection/filter';

export default (reservations) => {
  return filter(reservations, (reservation) => {
    const reservationNotExpired = !moment(reservation.endDate).isBefore(Date.now());

    return reservationNotExpired;
  });
};
