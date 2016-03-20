import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';

import { Dialog,
         FlatButton,
         SelectField,
         MenuItem } from 'material-ui/lib';

import { formatForDisplay } from '../../utils';
import { base } from '../../config/composition';

const LocationModal = (props) => {
  const { actions,
          params,
          navigation,
          locations,
          toggleLocationModal } = props;
  const { anchor } = props.location.query;
  const { siteNavOpen, locationModalOpen } = navigation.toJS();

  const handleLocationSelection = (location, anchorId) => {
    actions.emitSiteNavToggle(!siteNavOpen);
    actions.emitLocationModalToggle(!locationModalOpen);
    actions.emitLocationIndexUpdate(location, anchorId);
  };

  const renderLocation = (location, index) => (
    <MenuItem
      key={index}
      value={index}
      primaryText={formatForDisplay(location)}
      onClick={handleLocationSelection.bind(null, location, anchor)}/>
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
        value={locations.indexOf(params.location)}
        floatingLabelText='Select a Location'>
          {locations.map(renderLocation)}
      </SelectField>
    </Dialog>
  ) : (
    <span>
      There are no locations to select.
    </span>
  );
};

LocationModal.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.shape({
    location: PropTypes.string
  }).isRequired,
  location: PropTypes.shape({
    query: PropTypes.object
  }),
  locations: PropTypes.array,
  navigation: ImmutablePropTypes.Map.isRequired,
  toggleLocationModal: PropTypes.func.isRequired
};

export default base(LocationModal);
