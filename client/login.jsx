import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import { OauthSender } from 'react-oauth-flow';

import { OAUTH_REDIRECT_URI, OAUTH_MS_SCOPES } from 'constants';

class Login extends PureComponent {
  handleRedirect = ({ url }) => {
    location.replace(url);

    return null;
  }

  render() {
    return (
      <OauthSender
        authorizeUrl={process.env.AUTHORIZE_URI}
        clientId={process.env.CLIENT_ID}
        redirectUri={OAUTH_REDIRECT_URI}
        args={{ scope: OAUTH_MS_SCOPES }}
        render={this.handleRedirect}/>
    );
  }
}

export default Login;
