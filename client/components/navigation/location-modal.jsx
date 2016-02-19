import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';
import slug from 'slug';

import { Dialog,
         FlatButton,
         SelectField,
         MenuItem } from 'material-ui/lib';

import { base } from '../../config/composition';

const LocationModal = (props) => {
  const { actions,
          params,
          navigation,
          locations,
          toggleLocationModal } = props;
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
        onChange={actions.emitLocationIndexUpdate.bind(null, params.location, params.id)}
        floatingLabelText='Select a Location'>
          {locations.map(renderLocation)}
      </SelectField>
    </Dialog>
  ) : <span/>;
};

LocationModal.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.shape({
    location: PropTypes.string.isRequired
  }).isRequired,
  navigation: ImmutablePropTypes.Map.isRequired,
  toggleLocationModal: PropTypes.func.isRequired
};

export default base(LocationModal);
