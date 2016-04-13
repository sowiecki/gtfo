/**
 * Generates a helpful error message when backdrop rendering fails.
 * @param {string} location Location with failed rendering.
 * @returns {string} Error message.
 */
export const getBackdropErrorMessage = (location) => {
  const error = `Failed to render backdrop for ${location}.`;
  const reminder = `Make sure it's correctly saved in /environment/assets/ as ${location}.png`;

  return `${error} ${reminder}`;
};
