import moment from 'moment';
import filter from 'lodash/collection/filter';

/**
 * Filters out expired reservations.
 *
 * A reservation is considered "expired" if
 * both its start and end date are in the past.
 *
 * @param {array} reservations Meeting room reservations.
 * @return {array} Unexpired meeting room reservations.
 */
export const filterExpiredReservations = (reservations) => {
  return filter(reservations, (reservation) => {
    const reservationNotExpired = !moment(reservation.endDate).isBefore(Date.now());

    return reservationNotExpired;
  });
};
