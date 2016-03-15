/* eslint no-magic-numbers:0 */
import React from 'react';
import ImmutablePropTypes from 'immutable-props';

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

DisplayError.propTypes = {
  layout: ImmutablePropTypes.Map
};

export default base(DisplayError);
