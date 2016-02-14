import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';

import { Dialog, FlatButton } from 'material-ui/lib';

const LocationModal = (props) => {
  const { navigation, toggleLocationModal, submitLocationUpdate } = props;
  const { locationModalOpen } = navigation.toJS();

  const buttons = [
    <FlatButton
      key='cancel-location-modal'
      label='Cancel'
      secondary={true}
      onClick={toggleLocationModal}/>,
    <FlatButton
      key='submit-location-modal'
      label='Submit'
      primary={true}
      onClick={submitLocationUpdate}/>
  ];

  return (
    <Dialog
      title='Select Location'
      actions={buttons}
      modal={true}
      open={locationModalOpen}>
        Select a location to view.
    </Dialog>
  );
};

LocationModal.propTypes = {
  navigation: ImmutablePropTypes.Map.isRequired,
  toggleLocationModal: PropTypes.func.isRequired,
  submitLocationUpdate: PropTypes.func.isRequired
};

export default LocationModal;
