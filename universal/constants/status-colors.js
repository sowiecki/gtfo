import { OCCUPIED,
         SQUATTED,
         ABANDONED,
         VACANT,
         FIVE_MINUTE_WARNING,
         ONE_MINUTE_WARNING,
         BOOKED,
         OFFLINE,
         PINGED } from './statuses';

const PURPLE = '#9800FF';
const BLUE = '#3399FF';
const PURPLE_LIGHT = '#7587FF';
const RED = '#CC223E';
const GREEN = '#00DB54';
const ORANGE = '#FF6100';
const YELLOW = '#F3B700';
const GREY = '#D3D3D3';

export const STATUS_COLORS = {
  [OCCUPIED]: BLUE,
  [SQUATTED]: PURPLE,
  [ABANDONED]: PURPLE_LIGHT,
  [VACANT]: GREEN,
  [FIVE_MINUTE_WARNING]: ORANGE,
  [ONE_MINUTE_WARNING]: RED,
  [BOOKED]: BLUE,
  [OFFLINE]: GREY,
  [PINGED]: YELLOW,
  [undefined]: GREY
};
