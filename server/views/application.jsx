import React, { PropTypes } from 'react';

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

export default Application;
