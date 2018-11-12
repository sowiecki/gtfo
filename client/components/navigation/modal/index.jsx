/* globals document */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import { VelocityComponent } from 'velocity-react';

import stylesGenerator from './styles';

class Modal extends PureComponent {
  static propTypes = {
    modalContent: PropTypes.node.isRequired,
    computedStyles: PropTypes.shape({
      base: PropTypes.object.isRequired
    }).isRequired
  };

  render() {
    const { modalContent, computedStyles } = this.props;

    return ReactDOM.createPortal(
      <div className={computedStyles.base}>
        <VelocityComponent animation={{ opacity: modalContent ? 1 : 0 }} duration={250}>
          <div>{modalContent}</div>
        </VelocityComponent>
      </div>,
      document.getElementById('modal')
    );
  }
}

export default withStyles(stylesGenerator)(Modal);
