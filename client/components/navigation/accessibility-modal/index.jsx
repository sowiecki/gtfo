import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';
import { capitalize } from 'lodash';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ModalBase from 'components/common/modal-base';
import { DEFAULT, RED_GREEN, BLUE_YELLOW, MONOCHROME } from 'constants';
import { STATUS_COLOR_THEMES } from 'components/common/styles';
import stylesGenerator from './styles';

const AccessibilityModal = ({ computedStyles, actions }) => {
  const renderIcon = (color) => (
    <svg height='20' width='50'>
      <rect x='0' y='0' width='50' height='20' fill={color} />
    </svg>
  );

  const handleThemeUpdate = (key) => {
    actions.emitModalContentUpdate(null);
    actions.emitStatusesThemeUpdate(key);
  };

  const renderThemeColors = (key) => (
    <td
      role="button" // eslint-disable-line
      onClick={handleThemeUpdate.bind(null, key)}
      onKeyDown={handleThemeUpdate.bind(null, key)}
      className={computedStyles.list(key)}>
      <List>
        <ListItem>
          <h3>{capitalize(key)}</h3>
        </ListItem>
        <ListItem>{renderIcon(STATUS_COLOR_THEMES[key].OFFLINE)}</ListItem>
        <ListItem>{renderIcon(STATUS_COLOR_THEMES[key].VACANT)}</ListItem>
        <ListItem>{renderIcon(STATUS_COLOR_THEMES[key].SQUATTED)}</ListItem>
        <ListItem>{renderIcon(STATUS_COLOR_THEMES[key].ABANDONED)}</ListItem>
        <ListItem>{renderIcon(STATUS_COLOR_THEMES[key].BOOKED)}</ListItem>
        <ListItem>{renderIcon(STATUS_COLOR_THEMES[key].FIVE_MINUTE_WARNING)}</ListItem>
        <ListItem>{renderIcon(STATUS_COLOR_THEMES[key].ONE_MINUTE_WARNING)}</ListItem>
      </List>
    </td>
  );

  return (
    <ModalBase>
      <div className={computedStyles.header}>
        <div>Select a color theme</div>
        <IconButton
          aria-label='Close'
          onKeyDown={() => actions.emitModalContentUpdate(null)}
          onClick={() => actions.emitModalContentUpdate(null)}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </div>

      <Divider />

      <table className={computedStyles.table}>
        <tbody>
          <tr>
            <td>
              <List>
                <ListItem>
                  <h3>Label</h3>
                </ListItem>
                <ListItem>Offline</ListItem>
                <ListItem>Vacant</ListItem>
                <ListItem>Squatted</ListItem>
                <ListItem>Abandoned</ListItem>
                <ListItem>Booked</ListItem>
                <ListItem>Five minute warning</ListItem>
                <ListItem>One minute warning</ListItem>
              </List>
            </td>

            {renderThemeColors(DEFAULT)}

            {renderThemeColors(RED_GREEN)}

            {renderThemeColors(BLUE_YELLOW)}

            {renderThemeColors(MONOCHROME)}
          </tr>
        </tbody>
      </table>
    </ModalBase>
  );
};

AccessibilityModal.propTypes = {
  actions: PropTypes.shape({
    emitModalContentUpdate: PropTypes.func.isRequired
  }).isRequired,
  computedStyles: PropTypes.shape({
    base: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired,
    list: PropTypes.func.isRequired
  }).isRequired
};

export default withStyles(stylesGenerator)(AccessibilityModal);
