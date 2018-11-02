import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import stylesGenerator from './styles';

class Modal extends PureComponent {
  static propTypes = {
    modalContent: PropTypes.node.isRequired
  };

  render() {
    const { modalContent, computedStyles } = this.props;

    return ReactDOM.createPortal(
      <div className={computedStyles.base}>{modalContent}</div>,
      document.getElementById('modal')
    );
  }
}

export default withStyles(stylesGenerator)(Modal);
