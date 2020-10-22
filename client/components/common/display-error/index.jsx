import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import Snackbar from '@material-ui/core/Snackbar';

import stylesGenerator from './styles';

const DisplayError = ({ computedStyles, error, onClose = () => {} }) => {
  const message = error ? error.message : '';
  const timeout = error ? error.timeout : null;

  return (
    <Snackbar
      className={`${computedStyles.base} dont-blur`}
      open={!!error}
      action='error'
      message={message}
      onClose={onClose}
      autoHideDuration={timeout}/>
  );
};

DisplayError.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired
  }).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    timeout: PropTypes.number
  }),
  onClose: PropTypes.func
};

export default withStyles(stylesGenerator)(DisplayError);
