import moment from 'moment';

export const MOCK_DATA_FILE = './environment/mock-data.json';
export const GAP_PROBABILITY = 8;
export const RESERVATIONS_PER_DAY = 8;

const START_HOUR = 9;
export const START_OF_DAY = moment()
  .startOf('day')
  .add(START_HOUR, 'hours')
  .toISOString();
