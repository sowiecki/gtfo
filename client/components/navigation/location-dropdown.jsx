import React, { PropTypes } from 'react';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import { styles } from './styles';
import { formatForDisplay } from '../../utils';
import { base } from '../../config/composition';

const LocationModal = (props) => {
  const { actions,
          params,
          locations,
          location } = props;
  const { anchor } = location.query;

  const renderLocationSelection = (renderedLocation, index) => (
    <MenuItem
      key={index}
      value={index}
      style={styles.mobileLocationSelectionMenuItem}
      primaryText={formatForDisplay(renderedLocation)}
      onClick={actions.emitLocationIndexUpdate.bind(null, renderedLocation, anchor)}/>
  );

  return locations ? (
    <SelectField
      className='mobile-location-selection-label'
      labelStyle={styles.mobileLocationSelectionLabel}
      underlineStyle={styles.mobileLocationSelectionUnderline}
      value={locations.indexOf(params.location)}
      onChange={() => {}}>
        {locations.map(renderLocationSelection)}
    </SelectField>
  ) : (
    <span>
      There are no locations to select.
    </span>
  );
};

LocationModal.propTypes = {
  actions: PropTypes.shape({
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
