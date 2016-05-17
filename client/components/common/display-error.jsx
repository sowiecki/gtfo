/* eslint no-magic-numbers:0 */
import React, { PropTypes } from 'react';

import Snackbar from 'material-ui/Snackbar';

import { base } from '../../config/composition';
import { styles } from './styles';

const DisplayError = ({ error, onRequestClose = () => {} }) => {
  const message = error ? error.message : '';
  const timeout = error ? error.timeout : null;

  return (
    <Snackbar
      style={styles.errorSnackbar}
      open={!!error}
      action='error'
      message={message}
      onRequestClose={onRequestClose}
      autoHideDuration={timeout}/>
  );
};

DisplayError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  }),
  onRequestClose: PropTypes.func
};

export default base(DisplayError);
