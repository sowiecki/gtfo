import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';
import slug from 'slug';

import { Dialog,
         FlatButton,
         SelectField,
         MenuItem } from 'material-ui/lib';

import { base } from '../../config/composition';

/**
 * TODO decide wtf to do with this, if anything
 */
const LocationModal = (props) => {
  const { params,
          navigation,
          locations,
          toggleLocationModal,
          submitLocationUpdate } = props;
  const { locationModalOpen } = navigation.toJS();

  const renderLocation = (location, index) => (
    <MenuItem
      key={index}
      label={location}
      primaryText={location}
      value={slug(location, { lower: true })}/>
  );

  const buttons = [
    <FlatButton
      key='cancel-location-modal'
      label='Cancel'
      secondary={true}
      onClick={toggleLocationModal}/>
  ];

  return locations ? (
    <Dialog
      actions={buttons}
      modal={true}
      open={locationModalOpen}>
      <SelectField
        value={params.location}
        onChange={(e, i, value) => submitLocationUpdate.bind(null, value)}
        floatingLabelText='Select a Location'>
          {locations.map(renderLocation)}
      </SelectField>
    </Dialog>
  ) : <span/>;
};

LocationModal.propTypes = {
  params: PropTypes.shape({
    location: PropTypes.string.isRequired
  }).isRequired,
  navigation: ImmutablePropTypes.Map.isRequired,
  toggleLocationModal: PropTypes.func.isRequired,
  submitLocationUpdate: PropTypes.func.isRequired
};

export default base(LocationModal);
