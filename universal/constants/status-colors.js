import { OCCUPIED,
         SQUATTED,
         VACANT,
         FIVE_MINUTE_WARNING,
         ONE_MINUTE_WARNING,
         BOOKED,
         OFFLINE,
         PINGED } from './statuses';

const PURPLE = '#9800FF';
const BLUE = '#3399FF';
const RED = '#FF0000';
const GREEN = '#00CC00';
const ORANGE = '#FFAE00';
const YELLOW = '#FFFF00';
const GREY = '#D3D3D3';

export const STATUS_COLORS = {
  [OCCUPIED]: BLUE,
  [SQUATTED]: PURPLE,
  [VACANT]: GREEN,
  [FIVE_MINUTE_WARNING]: ORANGE,
  [ONE_MINUTE_WARNING]: RED,
  [BOOKED]: BLUE,
  [OFFLINE]: GREY,
  [PINGED]: YELLOW,
  [undefined]: GREY
};
