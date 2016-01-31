/* globals window */
export const shapeModifier = ({ height, width, x, y }) => {
  const windowRatio = window.innerWidth / window.innerHeight; // TODO add to Redux store
  // 1.97 for 16:9
  // 1.39 for 5:4

  const fiveFourHeightModifier = windowRatio < 1.5 ? .2 : 0;
  const fiveFourWidthModifier = windowRatio < 1.5 ? .4 : 0;
  const fiveFourXModifier = windowRatio < 1.5 ? .5 : 0;
  const fiveFourYModifier = windowRatio < 1.5 ? 0 : 0;

  return {
    height: `${height + fiveFourHeightModifier}%`,
    width: `${width + fiveFourWidthModifier}%`,
    x: `${x + fiveFourXModifier}%`,
    y: `${y + fiveFourYModifier}%`
  };
};
