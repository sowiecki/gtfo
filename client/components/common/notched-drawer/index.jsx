import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import Icon from '@material-ui/core/Icon';

import stylesGenerator from './styles';

/**
 * Semi-generic drawer-with-a-notch component.
 * Could be improved by not having static height values,
 * which would make it more flexible for displaying diverse content.
 */
class NotchedDrawer extends PureComponent {
  static propTypes = {
    computedStyles: PropTypes.shape({
      base: PropTypes.object.isRequired,
      notch: PropTypes.object.isRequired,
      notchButton: PropTypes.object.isRequired,
      children: PropTypes.object.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired // eslint-disable-line
  };

  componentDidUpdate(prevProps) {
    const { isOpen, onClose } = this.props;

    if (isOpen === false && prevProps.isOpen === true) {
      onClose();
    }
  }

  render() {
    const { computedStyles, onClick, children } = this.props;

    return (
      <div className={computedStyles.base}>
        <button className={computedStyles.notchButton} onClick={onClick} type='button'>
          <Icon>keyboard_arrow_up</Icon>
        </button>
        <div className={computedStyles.children}>{children}</div>
      </div>
    );
  }
}

export default withStyles(stylesGenerator)(NotchedDrawer);
