export const shapeModifier = ({ height, width, x, y }) => {
  return {
    height: `${height}%`,
    width: `${width}%`,
    x: `${x}%`,
    y: `${y}%`
  };
};
