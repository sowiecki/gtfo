import React, { PropTypes } from 'react';
import { StyleRoot, Style } from 'radium';

import NavigationContainer from './navigation/container';
import MarkersContainer from './markers/container';

import { base } from '../config/composition';
import { rules } from './common/styles';

const Body = (props) => {
  return (
    <StyleRoot>
      <Style rules={rules.body}/>
      <NavigationContainer {...props}/>
      <MarkersContainer {...props}/>
      {props.children}
    </StyleRoot>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default base(Body);
