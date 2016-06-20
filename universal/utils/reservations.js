import moment from 'moment';
import { filter } from 'lodash';

/**
 * Filters out expired reservations.
 *
 * A reservation is considered "expired" if
 * both its start and end date are in the past.
 *
 * @param {array} reservations - Meeting room reservations.
 * @param {moment} explicitTime - Time to filter before.
 * @return {array} Unexpired meeting room reservations.
 */
export const filterExpiredReservations = (reservations, explicitTime) => (
  filter(reservations, (reservation) => {
    const reservationNotExpired = !moment(reservation.endDate).isBefore(explicitTime);

    return reservationNotExpired;
  })
);
