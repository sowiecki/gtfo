import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import stylesGenerator from './styles';

const AccessibilityModal = ({ computedStyles, actions, ...props }) => {
  console.log(props);

  return (
    <div className={computedStyles.base}>
      Hello, world
      <br />
      <button
        onKeyDown={() => actions.emitModalContentUpdate(null)}
        onClick={() => actions.emitModalContentUpdate(null)}>
        Close
      </button>
    </div>
  );
};

AccessibilityModal.propTypes = {
  actions: PropTypes.shape({
    emitModalContentUpdate: PropTypes.func.isRequired
  }).isRequired,
  computedStyles: PropTypes.shape({
    base: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(stylesGenerator)(AccessibilityModal);
