import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { formatForDisplay } from 'utils';

import stylesGenerator from './styles';

const LocationDropdown = (props) => {
  const { computedStyles, actions, locations, location } = props;

  const renderLocationSelection = (selectLocation, index) => (
    <MenuItem key={index} value={`/${selectLocation}`} className={computedStyles.menuItem}>
      {formatForDisplay(selectLocation)}
    </MenuItem>
  );

  return locations ? (
    <Select
      className={computedStyles.select}
      value={locations.indexOf(location.pathname)}
      onChange={({ target }) => actions.push({ ...location, pathname: target.value })}
      renderValue={() => formatForDisplay(location.pathname)}>
      {locations.map(renderLocationSelection)}
    </Select>
  ) : (
    <span>There are no locations to select.</span>
  );
};

LocationDropdown.propTypes = {
  computedStyles: PropTypes.shape({
    menuItem: PropTypes.object.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  locations: PropTypes.array
};

export default withStyles(stylesGenerator)(LocationDropdown);
