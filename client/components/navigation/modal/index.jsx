import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends PureComponent {
  static propTypes = {
    modalContent: PropTypes.node.isRequired
  };

  render() {
    const { modalContent } = this.props;

    return ReactDOM.createPortal(modalContent, document.getElementById('modal'));
  }
}

export default Modal;
