import moment from 'moment';

const START_HOUR = 9;

export const START_OF_DAY = moment()
  .startOf('day')
  .add(START_HOUR, 'hours')
  .toISOString();

export const END_OF_DAY = moment()
  .endOf('day')
  .add(START_HOUR, 'hours')
  .toISOString();
