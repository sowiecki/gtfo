import React, { PropTypes } from 'react';
import { pure } from 'recompose';

const SVGBase = (props) => (
  <svg {...props}>{props.children}</svg>
);

SVGBase.propTypes = {
  children: PropTypes.element,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default pure(SVGBase);
