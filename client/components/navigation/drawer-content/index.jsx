/* globals localStorage, window */
/* eslint react/no-danger:0 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { FAHRENHEIT, CELSIUS, GTFO_OAUTH_ACCESS_TOKEN } from 'client/constants';
import AccessibilityModal from 'components/navigation/accessibility-modal';
import DrawerContentItem from './drawer-content-item';
import stylesGenerator from './styles';

const DrawerContent = (props) => {
  const {
    computedStyles,
    note,
    onViewFutureAvailabilitiesClick,
    onFullscreenOpenClick,
    siteNavOpen,
    actions,
    displayLegend,
    displayTemp,
    enableTemp,
    unitOfTemp,
    displayAdditionalInfo
  } = props;

  const inverseUnitOfTempText = {
    [FAHRENHEIT]: 'Celsius',
    [CELSIUS]: 'Fahrenheit'
  };

  const renderRemperatureOptions = () => (
    <Fragment>
      {/* TODO https://github.com/Nase00/gtfo/issues/160
      <DrawerContentItem
        onClick={actions.emitDisplayTempToggle.bind(null, displayTemp)}
        icon='ac_unit'
        enabled={displayTemp}
        primary={`${displayTemp ? 'Hide' : 'Display'} temperature`}/> */}

      <DrawerContentItem
        onClick={actions.emitTempScaleToggle.bind(null, unitOfTemp)}
        icon={unitOfTemp[0].toUpperCase()}
        enabled={displayTemp}
        className={computedStyles.tempIconAdjust}
        primary={`Use ${inverseUnitOfTempText[unitOfTemp]}`}/>
    </Fragment>
  );

  const renderLogOutButton = () => (
    <DrawerContentItem
      enabled
      onClick={() => {
        localStorage.removeItem(GTFO_OAUTH_ACCESS_TOKEN);

        window.location.reload();
      }}
      icon='logout'
      primary='Logout'/>
  );

  return (
    <List className={`${computedStyles.base} dont-blur`}>
      <DrawerContentItem
        onClick={onViewFutureAvailabilitiesClick}
        enabled
        icon='schedule'
        primary='Time travel'/>

      <DrawerContentItem
        onClick={onFullscreenOpenClick}
        enabled={displayLegend}
        icon='fullscreen'
        primary='Fullscreen'/>

      <DrawerContentItem
        onClick={actions.emitModalContentUpdate.bind(null, <AccessibilityModal {...props} />)}
        enabled
        icon='accessibility_new'
        primary='Accessibility options'/>

      <Divider />

      <DrawerContentItem
        onClick={actions.emitDisplayLegendToggle.bind(null, displayLegend)}
        enabled={displayLegend}
        icon='map'
        primary={`${displayLegend ? 'Hide' : 'Display'} map legend`}/>

      {enableTemp ? renderRemperatureOptions() : null}

      <DrawerContentItem
        onClick={actions.emitAdditionalInfoToggle.bind(null, displayAdditionalInfo)}
        enabled={displayAdditionalInfo}
        icon='info'
        primary={`${displayAdditionalInfo ? 'Hide' : 'Display'} additional info`}/>

      <Divider />

      <DrawerContentItem
        onClick={actions.emitToggleSiteNav.bind(null, !siteNavOpen)}
        enabled={displayLegend}
        icon='clear'
        primary='Close drawer'/>

      {!process.env.HEADLESS_AUTH ? renderLogOutButton() : null}

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
  onFullscreenOpenClick: PropTypes.func.isRequired,
  siteNavOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitToggleSiteNav: PropTypes.func.isRequired,
    emitDisplayLegendToggle: PropTypes.func.isRequired,
    emitTempScaleToggle: PropTypes.func.isRequired
  }).isRequired,
  displayLegend: PropTypes.bool.isRequired,
  displayTemp: PropTypes.bool.isRequired,
  displayAdditionalInfo: PropTypes.bool.isRequired,
  enableTemp: PropTypes.bool.isRequired,
  unitOfTemp: PropTypes.string.isRequired
};

export default withStyles(stylesGenerator)(DrawerContent);
