/**
 * Formats location's properties for easier use.
 * E.g., not having to use .replace everywhere when comparing locations.
 * @param {object} location
 * @returns {object}
 */
export const formatLocationProps = (location) => ({
  ...location,
  pathname: location.pathname.replace('/', '')
});
