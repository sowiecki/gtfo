/* eslint no-magic-numbers:0 */
import React from 'react';

import { Snackbar } from 'material-ui/lib';

import { base } from '../../config/composition';
// import { styles } from './styles';

// TODO consider this stubbed out, it needs work

const DisplayError = ({ error }) => {
  return (
    <Snackbar
      open={true}
      message={error.message}
      onRequestClose={() => {}}
      autoHideDuration={4000}/>
  );
};

export default base(DisplayError);
