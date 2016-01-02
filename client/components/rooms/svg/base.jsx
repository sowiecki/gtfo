import React, { PropTypes } from 'react';

const SVGBase = (props) => (
  <svg {...props}>{props.children}</svg>
);

SVGBase.propTypes = {
  children: PropTypes.element,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default SVGBase;
