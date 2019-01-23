/* globals window */
import React, { PureComponent } from 'react';
import { OauthSender } from 'react-oauth-flow';
import queryString from 'query-string';

import { OAUTH_REDIRECT_URI_PATH, OAUTH_MS_SCOPES_DEFAULT } from 'constants';

class Login extends PureComponent {
  handleRedirect = ({ url }) => {
    window.location.replace(url);

    return null;
  };

  getScopes = () => {
    const { scopes } = queryString.parse(window.location.search);

    return scopes || OAUTH_MS_SCOPES_DEFAULT;
  };

  render() {
    return (
      <OauthSender
        authorizeUrl={process.env.AUTHORIZE_URI}
        clientId={process.env.CLIENT_ID}
        redirectUri={`${window.location.origin}${OAUTH_REDIRECT_URI_PATH}`}
        args={{ scope: this.getScopes() }}
        render={this.handleRedirect}/>
    );
  }
}

export default Login;
