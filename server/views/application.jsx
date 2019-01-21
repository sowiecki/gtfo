import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import Root from '../components/root';
import { BUNDLE_PATH } from '../config';
import fonts from '../assets/fonts';

const Application = ({ bundle }) => {
  const includeFont = (fontSource) => (
    <link key={fontSource} href={fontSource} rel='stylesheet' type='text/css'/>
  );

  return (
    <Root>
      <div id='root'/>
      <div id='modal'/>
      <script src={bundle}/>
    </Root>
  );
};

Application.propTypes = {
  bundle: PropTypes.string.isRequired
};

const applicationView = ReactDOMServer.renderToStaticMarkup(<Application bundle={BUNDLE_PATH}/>);

export default applicationView;
