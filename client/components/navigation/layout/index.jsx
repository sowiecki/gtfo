import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import Drawer from '@material-ui/core/Drawer';

import Modal from 'components/navigation/modal';
import DrawerContent from 'components/navigation/drawer-content';
import Header from 'components/navigation/header';
import TimeTravel from 'components/navigation/time-travel';
import stylesGenerator from './styles';

const NavigationLayout = (props) => (
  <div
    className={props.shouldBlur ? 'blur' : ''}
    onClick={props.onCloseEverything}
    onKeyPress={props.onCloseEverything}
    role='button'
    tabIndex='0'>
    <Header {...props} />
    <Drawer
      className={props.computedStyles.drawer}
      open={props.siteNavOpen}
      onClose={props.actions.emitToggleSiteNav.bind(null, !props.siteNavOpen)}>
      <DrawerContent
        onViewFutureAvailabilitiesClick={props.onViewFutureAvailabilitiesClick}
        onFullscreenOpenClick={props.onFullscreenOpenClick}
        {...props}/>
    </Drawer>
    <TimeTravel {...props} onTimeTravelDismissClick={props.onTimeTravelDismissClick} />
    <Modal {...props} modalContent={props.modalContent} />
    {props.children}
  </div>
);

NavigationLayout.propTypes = {
  computedStyles: PropTypes.shape({
    drawer: PropTypes.object.isRequired
  }).isRequired,
  shouldBlur: PropTypes.bool.isRequired,
  onCloseEverything: PropTypes.func.isRequired,
  siteNavOpen: PropTypes.bool.isRequired,
  onTimeTravelDismissClick: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    emitToggleSiteNav: PropTypes.func.isRequired
  }).isRequired,
  modalContent: PropTypes.node
};

export default withStyles(stylesGenerator)(NavigationLayout);
