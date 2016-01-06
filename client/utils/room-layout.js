import { SHAPE_SIZE_MODIFIER } from '../constants/svg';

export const shapeModifier = ({ height, width, x, y }) => ({
  height: height * SHAPE_SIZE_MODIFIER,
  width: width * SHAPE_SIZE_MODIFIER,
  x,
  y
});

// TODO decide if using this or slug
// export const mapRoomClass = (alert) => {
//   return {
//     VACANT: 'vacant',
//     FIVE_MINUTE_WARNING: 'five-minute-warning',
//     ONE_MINUTE_WARNING: 'one-minute-warning',
//     BOOKED: 'booked'
//   }[alert];
// };
