import React, { PropTypes } from 'react';
import { StyleRoot, Style } from 'radium';

import NavigationContainer from './navigation/container';
import DevTools from './dev-tools';

import { provideMuiTheme, base } from '../config/composition';
import { rules } from './common/styles';

const Body = (props) => {
  const isProd = process.env.NODE_ENV === 'production';

  const devTools = isProd ? null : (
    <DevTools/>
  );

  return provideMuiTheme(
    <StyleRoot>
      <Style rules={rules.body}/>
      {devTools}
      <NavigationContainer {...props}/>
      {props.children}
    </StyleRoot>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default base(Body);
