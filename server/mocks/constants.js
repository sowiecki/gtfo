import moment from 'moment';

export const MOCK_DATA_FILE = './mock-data.json';
export const GAP_PROBABILITY = 0;
export const RESERVATIONS_PER_DAY = 10;
export const START_OF_DAY = moment().startOf('day').add(9, 'hours').toISOString(); // 9:00AM
