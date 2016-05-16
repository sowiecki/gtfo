import React, { PropTypes } from 'react';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { formatForDisplay } from '../../utils';
import { base } from '../../config/composition';

const LocationModal = (props) => {
  const { actions,
          params,
          locations,
          location,
          siteNavOpen,
          locationModalOpen } = props;
  const { anchor } = location.query;

  const handleLocationSelection = (selectedLocation, anchorId) => {
    actions.emitSiteNavToggle(!siteNavOpen);
    actions.emitLocationModalToggle(locationModalOpen);
    actions.emitLocationIndexUpdate(selectedLocation, anchorId);
  };

  const renderLocation = (renderedLocation, index) => (
    <MenuItem
      key={index}
      value={index}
      primaryText={formatForDisplay(renderedLocation)}
      onClick={handleLocationSelection.bind(null, renderedLocation, anchor)}/>
  );

  const buttons = [
    <FlatButton
      key='cancel-location-modal'
      label='Cancel'
      secondary={true}
      onClick={actions.emitLocationModalToggle.bind(null, locationModalOpen)}/>
  ];

  return locations ? (
    <Dialog
      actions={buttons}
      modal={true}
      open={locationModalOpen}>
      <SelectField
        value={locations.indexOf(params.location)}
        onChange={() => {}}
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
  siteNavOpen: PropTypes.bool.isRequired,
  locationModalOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitSiteNavToggle: PropTypes.func.isRequired,
    emitLocationModalToggle: PropTypes.func.isRequired,
    emitLocationIndexUpdate: PropTypes.func.isRequired
  }).isRequired,
  params: PropTypes.shape({
    location: PropTypes.string
  }).isRequired,
  location: PropTypes.shape({
    query: PropTypes.object
  }),
  locations: PropTypes.array
};

export default base(LocationModal);
