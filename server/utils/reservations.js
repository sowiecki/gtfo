/**
 * Formats reservations response
 *
 * @param {object} reservations Raw meeting room reservations.
 * @return {object} Formatted meeting room reservations.
 */
export const formatReservations = (reservations) => {
  const formattedReservationes = {};

  reservations.forEach((reservation) => {
    formattedReservationes[reservation.name] = reservation.schedule;
  });

  return formattedReservationes;
};
