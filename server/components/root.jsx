import React from 'react';
import PropTypes from 'prop-types';

import fonts from '../assets/fonts';

const Root = ({ children }) => {
  const includeFont = (fontSource) => (
    <link key={fontSource} href={fontSource} rel='stylesheet' type='text/css' />
  );

  return (
    <html lang='en'>
      <head>
        {fonts.map(includeFont)}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>{children}</body>
    </html>
  );
};

Root.propTypes = {
  children: PropTypes.node.isRequired
};

export default Root;
