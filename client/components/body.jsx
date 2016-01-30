import React, { PropTypes } from 'react';
import { pure } from 'recompose';

import NavigationContainer from './navigation/container';

const Body = (props) => {
  return (
    <span>
      <NavigationContainer {...props}/>
      {props.children}
    </span>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default pure(Body);
