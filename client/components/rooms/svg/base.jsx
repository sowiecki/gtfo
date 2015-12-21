import React, { PropTypes } from 'react';

const SVGBase = (props) => (
  <svg {...props}>{props.children}</svg>
);

SVGBase.propTypes = {
  children: PropTypes.element.isRequired
};

export default SVGBase;
