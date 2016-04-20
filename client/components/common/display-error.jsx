/* eslint no-magic-numbers:0 */
import React, { PropTypes } from 'react';

import Snackbar from 'material-ui/Snackbar';

import { base } from '../../config/composition';
import { styles } from './styles';

const DisplayError = ({ error }) => {
  const message = error ? error.message : '';

  return (
    <Snackbar
      style={styles.errorSnackbar}
      open={!!error}
      message={message}
      onRequestClose={() => {}}
      autoHideDuration={4000}/>
  );
};

DisplayError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  })
};

export default base(DisplayError);
