import { SQUATTED,
         VACANT,
         ONE_MINUTE_WARNING,
         FIVE_MINUTE_WARNING,
         BOOKED,
         OFFLINE } from '../../universal/constants';

export const STATUS_MESSAGES = {
  [SQUATTED]: 'Occupied without reservation',
  [VACANT]: 'Vacant for at least 30 minutes',
  [ONE_MINUTE_WARNING]: '1 minute left on current reservation',
  [FIVE_MINUTE_WARNING]: '5 minutes left on current reservation',
  [BOOKED]: 'Currently booked',
  [OFFLINE]: 'Offline',
  [undefined]: 'Offline'
};

export const LOG_COLORS = {
  [SQUATTED]: 'magenta',
  [VACANT]: 'green',
  [ONE_MINUTE_WARNING]: 'red',
  [FIVE_MINUTE_WARNING]: 'yellow',
  [BOOKED]: 'cyan',
  [OFFLINE]: 'grey',
  [undefined]: 'grey'
};

export const GUAGE_COLORS = {
  [SQUATTED]: 'magenta',
  [VACANT]: 'green',
  [ONE_MINUTE_WARNING]: 'red',
  [FIVE_MINUTE_WARNING]: 'yellow',
  [BOOKED]: 'cyan',
  [OFFLINE]: 'black',
  [undefined]: 'black'
};

export const ONLINE = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';

export const CONTRIB_TABLE_HEADERS = ['Module status', 'Room name', 'Reservation status'];
