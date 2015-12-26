import moment from 'moment';

export const GAP_PROBABILITY = 5;
export const RESERVATIONS_PER_DAY = 10;
export const START_OF_DAY = moment().startOf('day').add(9, 'hours').toISOString();
