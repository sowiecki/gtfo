import React, { PropTypes } from 'react';
import { StyleRoot, Style } from 'radium';

import NavigationContainer from './navigation/container';
import DevTools from './dev-tools';

import { base } from '../config/composition';
import { rules } from './common/styles';

const Body = (props) => {
  const isFullscreen = props.location.query.fullscreen === 'true';
  const isProd = process.env.NODE_ENV === 'production';

  // TODO provide some small button to return from fullscreen
  const navigation = isFullscreen ? null : (
    <NavigationContainer {...props}/>
  );

  const devTools = isProd ? null : (
    <DevTools/>
  );

  return (
    <StyleRoot>
      <Style rules={rules.body}/>
      {devTools}
      {navigation}
      {props.children}
    </StyleRoot>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      fullscreen: PropTypes.bool
    })
  })
};

export default base(Body);
