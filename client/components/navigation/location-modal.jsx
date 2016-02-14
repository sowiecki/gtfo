import React from 'react';

import { Dialog, FlatButton } from 'material-ui/lib';

const LocationModal = ({ navigation, actions }) => {
  const { locationModalOpen } = navigation.toJS();

  const buttons = [
    <FlatButton
      key='cancel-location-modal'
      label='Cancel'
      secondary={true}
      onTouchTap={actions.handleCloseLocationModal}/>,
    <FlatButton
      key='submit-location-modal'
      label='Submit'
      primary={true}
      onTouchTap={actions.handleSubmitLocationModal}/>
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

export default LocationModal;
