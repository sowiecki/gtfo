import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import { base } from 'config/composition';
import { formatForDisplay } from 'utils';

import { styles } from './styles';

const LocationDropdown = (props) => {
  const { onSelectFieldChange,
    actions,
    locations,
    location } = props;

  const renderLocationSelection = (renderedLocation, index) => {
    const onClick = () => actions.push({ ...location, pathname: renderedLocation });

    return (
      <MenuItem
        key={index}
        value={index}
        style={styles.mobileLocationSelectionMenuItem}
        primaryText={formatForDisplay(renderedLocation)}
        onClick={onClick}/>
    );
  };

  return locations ? (
    <SelectField
      className='mobile-location-selection-label'
      labelStyle={styles.mobileLocationSelectionLabel}
      underlineStyle={styles.mobileLocationSelectionUnderline}
      value={locations.indexOf(location.pathname)}
      onChange={onSelectFieldChange}>
      {locations.map(renderLocationSelection)}
    </SelectField>
  ) : (
    <span>
      There are no locations to select.
    </span>
  );
};

LocationDropdown.propTypes = {
  onSelectFieldChange: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  locations: PropTypes.array
};

export default base(LocationDropdown);
