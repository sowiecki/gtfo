/* globals window */
import React, { PureComponent } from 'react';
import { OauthSender } from 'react-oauth-flow';

import { OAUTH_REDIRECT_URI_PATH, OAUTH_MS_SCOPES } from 'constants';

class Login extends PureComponent {
  handleRedirect = ({ url }) => {
    window.location.replace(url);

    return null;
  };

  render() {
    return (
      <OauthSender
        authorizeUrl={process.env.AUTHORIZE_URI}
        clientId={process.env.CLIENT_ID}
        redirectUri={`${window.location.origin}${OAUTH_REDIRECT_URI_PATH}`}
        args={{ scope: OAUTH_MS_SCOPES }}
        render={this.handleRedirect}/>
    );
  }
}

export default Login;
