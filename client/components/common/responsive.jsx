import { PropTypes } from 'react';

import { base } from '../../config/composition';

/**
 * Convenience container to control rendering of
 * different components at different breakpoints.
 *
 * @param {string} mobileBreakpoint - Breakpoint at which to render mobileAlt.
 * @param {element} children - Default component to render.
 * @param {element} mobileAlt - Alternative component to render at mobile breakpoints.
 */

const Responsive = ({ deviceWidth, mobileBreakpoint, children, mobileAlt }) => (
  deviceWidth > mobileBreakpoint ? children : mobileAlt
);

Responsive.propTypes = {
  mobileBreakpoint: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  mobileAlt: PropTypes.element.isRequired
};

export default base(Responsive);
