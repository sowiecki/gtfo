/* eslint react/no-danger:0 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import { isEmpty } from 'lodash';

import Root from '../components/root';
import { BUNDLE_PATH } from '../config';
import { GTFO_OAUTH_ACCESS_TOKEN } from '../constants';

const Application = ({ bundle, oauthResponse }) => {
  const injectToken = !isEmpty(oauthResponse) ? (
    <span
      dangerouslySetInnerHTML={{
        __html: `<script type="text/javascript">localStorage.setItem(['${GTFO_OAUTH_ACCESS_TOKEN}'], '${JSON.stringify(
          oauthResponse
        )}')</script>`
      }} />
  ) : null;

  return (
    <Root>
      {injectToken}
      <div id='root' />
      <div id='modal' />
      <script src={bundle} />
    </Root>
  );
};

Application.propTypes = {
  bundle: PropTypes.string.isRequired,
  oauthResponse: PropTypes.shape({
    accessToken: PropTypes.string.isRequired,
    expiresOn: PropTypes.string.isRequired
  })
};

const genApplicationView = (oauthResponse) =>
  ReactDOMServer.renderToString(<Application bundle={BUNDLE_PATH} oauthResponse={oauthResponse} />);

export default genApplicationView;
