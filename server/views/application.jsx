import React, { PropTypes } from 'react';
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
      </head>
      <body>
        <div id='root'/>
        <script src={bundle}></script>
      </body>
    </html>
  );
};

Application.propTypes = {
  bundle: PropTypes.string.isRequired
};

const applicationView = ReactDOMServer.renderToStaticMarkup(
  <Application bundle={BUNDLE_PATH}/>
);

export default applicationView;
