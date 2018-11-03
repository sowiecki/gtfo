import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import Drawer from '@material-ui/core/Drawer';

import Modal from 'components/navigation/modal';
import DrawerContent from 'components/navigation/drawer-content';
import Header from 'components/navigation/header';
import TimeTravel from 'components/navigation/time-travel';
import stylesGenerator from './styles';

const NavigationLayout = (props) => (
  <Fragment>
    <Header {...props}/>
    <Drawer
      className={props.computedStyles.drawer}
      open={props.siteNavOpen}
      onClose={props.actions.emitToggleSiteNav.bind(null, !props.siteNavOpen)}>
      <DrawerContent
        onViewFutureAvailabilitiesClick={props.onViewFutureAvailabilitiesClick}
        onOpenFullscreenClick={props.onOpenFullscreenClick}
        {...props}/>
    </Drawer>
    <TimeTravel onTimeTravelDismissClick={props.onTimeTravelDismissClick} {...props}/>
    <Modal modalContent={props.modalContent}/>
  </Fragment>
);

NavigationLayout.propTypes = {
  siteNavOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitToggleSiteNav: PropTypes.func.isRequired
  }).isRequired,
  modalContent: PropTypes.node
};

export default withStyles(stylesGenerator)(NavigationLayout);