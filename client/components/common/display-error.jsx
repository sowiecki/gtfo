/* eslint no-magic-numbers:0 */
import React from 'react';

import { Snackbar } from 'material-ui/lib';

import { base } from '../../config/composition';
import { styles } from './styles';

const DisplayError = ({ layout }) => {
  const hasError = layout.has('error');
  const { error } = layout.toJS();
  const message = hasError ? error.message : '';

  return (
    <Snackbar
      style={styles.errorSnackbar}
      open={hasError}
      message={message}
      onRequestClose={() => {}}
      autoHideDuration={4000}/>
  );
};

export default base(DisplayError);
