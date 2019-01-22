/* globals document, window, localStorage */
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';

import { GTFO_OAUTH_ACCESS_TOKEN } from 'constants';

const getOauthResponse = () => {
  try {
    const oauthResponse = JSON.parse(localStorage.getItem(GTFO_OAUTH_ACCESS_TOKEN));

    if (moment(oauthResponse).isAfter(moment())) {
      window.location.search = null;

      return false;
    }

    return oauthResponse;
  } catch (e) {
    return false;
  }
};

const oauthResponse = getOauthResponse();
const moduleSpecifier = process.env.HEADLESS_AUTH || oauthResponse ? 'application' : 'components/login';

import(/* webpackPrefetch: true */ `./${moduleSpecifier}`).then((module) => {
  const Component = module.default;
  const node = document.getElementById('root');

  render(<Component oauthResponse={oauthResponse} />, node);
});
