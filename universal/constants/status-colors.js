import {
  SQUATTED,
  ABANDONED,
  VACANT,
  FIVE_MINUTE_WARNING,
  ONE_MINUTE_WARNING,
  BOOKED,
  OFFLINE,
  PINGED
} from './statuses';

export const STATUS_COLORS = {
  [SQUATTED]: '#9800FF', // purple
  [ABANDONED]: '#99CCFF',
  [VACANT]: '#00DB54', // green
  [FIVE_MINUTE_WARNING]: '#FF6100', // orange
  [ONE_MINUTE_WARNING]: '#CC223E', // red
  [BOOKED]: '#3399FF', // blue
  [OFFLINE]: '#D3D3D3', // grey
  [PINGED]: '#F3B700', // yellow
  [undefined]: '#D3D3D3' // grey
};
