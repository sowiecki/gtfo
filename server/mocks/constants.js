import moment from 'moment';

export const MOCK_DATA_FILE = './environment/mock-data.json';
export const GAP_PROBABILITY = 0;
export const RESERVATIONS_PER_DAY = 14;

const START_HOUR = 9;
export const START_OF_DAY = moment()
  .startOf('day')
  .add(START_HOUR, 'hours')
  .toISOString();
