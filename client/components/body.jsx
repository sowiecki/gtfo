import React, { PropTypes } from 'react';
import { StyleRoot, Style } from 'radium';

import NavigationContainer from './navigation/container';

import { provideMuiTheme, base } from '../config/composition';
import { rules } from './common/styles';

const Body = (props) => {
  const IS_PROD_ENV = process.env.NODE_ENV === 'production';
  const DevTools = IS_PROD_ENV ? null : require('./dev-tools').default;

  return provideMuiTheme(
    <StyleRoot>
      <Style rules={rules.body}/>
      {IS_PROD_ENV ? null : <DevTools/>}
      <NavigationContainer {...props}/>
      {props.children}
    </StyleRoot>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default base(Body);
