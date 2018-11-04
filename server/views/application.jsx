import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import { BUNDLE_PATH } from '../config';
import fonts from '../assets/fonts';

const Application = ({ bundle }) => {
  const includeFont = (fontSource) => (
    <link key={fontSource} href={fontSource} rel='stylesheet' type='text/css'/>
  );

  return (
    <html lang='en'>
      <head>
        {fonts.map(includeFont)}
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
      </head>
      <body>
        <div id='root'/>
        <div id='modal'/>
        <script src={bundle}/>
      </body>
    </html>
  );
};

Application.propTypes = {
  bundle: PropTypes.string.isRequired
};

const applicationView = ReactDOMServer.renderToStaticMarkup(<Application bundle={BUNDLE_PATH}/>);

export default applicationView;
