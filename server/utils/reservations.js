import moment from 'moment';
import { filter } from 'lodash';

/**
 * Formats reservations response
 *
 * @param {object} reservations Raw meeting room reservations.
 * @return {object} Formatted meeting room reservations.
 */
export const formatReservations = ({ reservations }) => {
  const formattedReservationes = {};

  reservations.forEach((reservation) => {
    formattedReservationes[reservation.id] = reservation.schedule;
  });

  return formattedReservationes;
};

/**
 * Filters out expired reservations.
 *
 * A reservation is considered "expired" if
 * both its start and end date are in the past.
 *
 * @param {array} reservations Meeting room reservations.
 * @return {array} Unexpired meeting room reservations.
 */
export const filterExpiredReservations = (reservations) => filter(reservations, (reservation) => {
  const reservationNotExpired = !moment(reservation.endDate).isBefore(Date.now());

  return reservationNotExpired;
});
