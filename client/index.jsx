/* globals document, location */
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

import React from 'react';
import { render } from 'react-dom';
import queryString from 'query-string';

const { code } = queryString.parse(location.search);
// TODO check for accessToken || localStorage token
const moduleSpecifier = code ? 'application' : 'login';

import(/* webpackPrefetch: true */ `./${moduleSpecifier}`).then((module) => {
  const Component = module.default;
  const node = document.getElementById('root');

  render(<Component />, node);
});
