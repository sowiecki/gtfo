/* eslint react/no-danger:0 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { FAHRENHEIT, CELSIUS } from 'client/constants';
import DrawerContentItem from './drawer-content-item';
import stylesGenerator from './styles';

const DrawerContent = (props) => {
  const {
    computedStyles,
    note,
    onViewFutureAvailabilitiesClick,
    onOpenFullscreenClick,
    siteNavOpen,
    actions,
    displayLegend,
    displayTemp,
    enableTemp,
    unitOfTemp
  } = props;

  const inverseUnitOfTempText = {
    [FAHRENHEIT]: 'Celsius',
    [CELSIUS]: 'Fahrenheit'
  };

  const temperatureOptions = (
    <Fragment>
      <DrawerContentItem
        onClick={actions.emitToggleDisplayTemp.bind(null, displayTemp)}
        icon='ac_unit'
        enabled={displayTemp}
        primary={`${displayTemp ? 'Disable' : 'Enable'} temperature`}/>

      <DrawerContentItem
        onClick={actions.emitToggleTempScale.bind(null, unitOfTemp)}
        icon={unitOfTemp[0].toUpperCase()}
        enabled={displayTemp}
        className={computedStyles.tempIconAdjust}
        primary={`Use ${inverseUnitOfTempText[unitOfTemp]}`}/>
    </Fragment>
  );

  return (
    <List className={`${computedStyles.base} dont-blur`}>
      <DrawerContentItem
        onClick={onViewFutureAvailabilitiesClick}
        icon='schedule'
        primary='View future availabilities'/>

      <Divider />

      <DrawerContentItem
        onClick={actions.emitToggleDisplayLegend.bind(null, displayLegend)}
        enabled={displayLegend}
        icon='map'
        primary={`${displayLegend ? 'Disable' : 'Enable'} map legend`}/>

      {enableTemp ? temperatureOptions : null}

      <DrawerContentItem
        onClick={onOpenFullscreenClick}
        enabled={displayLegend}
        icon='fullscreen'
        primary='Open fullscreen'/>

      <Divider />

      <DrawerContentItem
        onClick={actions.emitToggleSiteNav.bind(null, !siteNavOpen)}
        enabled={displayLegend}
        icon='clear'
        primary='Close'/>

      <ListItem>
        <div className={computedStyles.note}>
          <span dangerouslySetInnerHTML={{ __html: note }} />
        </div>
      </ListItem>
    </List>
  );
};

DrawerContent.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired,
    tempIconAdjust: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired
  }).isRequired,
  note: PropTypes.string.isRequired,
  onViewFutureAvailabilitiesClick: PropTypes.func.isRequired,
  onOpenFullscreenClick: PropTypes.func.isRequired,
  siteNavOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitToggleSiteNav: PropTypes.func.isRequired,
    emitToggleDisplayLegend: PropTypes.func.isRequired,
    emitToggleTempScale: PropTypes.func.isRequired
  }).isRequired,
  displayLegend: PropTypes.bool.isRequired,
  displayTemp: PropTypes.bool.isRequired,
  enableTemp: PropTypes.bool.isRequired,
  unitOfTemp: PropTypes.string.isRequired
};

export default withStyles(stylesGenerator)(DrawerContent);
