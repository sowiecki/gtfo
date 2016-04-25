import React, { PropTypes } from 'react';
import { StyleRoot, Style } from 'radium';

import NavigationContainer from './navigation/container';

import { provideMuiTheme, base } from '../config/composition';
import { rules } from './common/styles';

const Body = (props) => {
  const isProd = process.env.NODE_ENV === 'production';
  const DevTools = isProd ? null : require('./dev-tools').default;

  return provideMuiTheme(
    <StyleRoot>
      <Style rules={rules.body}/>
      {isProd ? null : <DevTools/>}
      <NavigationContainer {...props}/>
      {props.children}
    </StyleRoot>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default base(Body);
