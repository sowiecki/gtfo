export const shapeModifier = ({ height, width, x, y }) => {
  // height = 18.9;
  // width = 10;
  // x = 89.5;
  // y = 40.5;
  return {
    height: `${height}%`,
    width: `${width}%`,
    x: `${x}%`,
    y: `${y}%`
  };
};
