import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Place from 'material-ui/svg-icons/maps/place';

import { applyStyles } from '../../config/composition';
import { STATUS_COLORS } from '../../constants';
import { styles } from './styles';

const MapLegend = ({ showYouAreHere, enabled, enableMotion, enableStalls }) => {
  if (!enabled) {
    return null;
  }

  const placeIcon = (
    <Avatar
      className='map-legend-icon'
      style={styles.mapLegendIcon}
      color={styles.placeMarker.fill}
      icon={<Place/>}/>
  );

  const youAreHereListItem = showYouAreHere ? (
    <ListItem style={styles.mapLegendItem} disabled={true} leftAvatar={placeIcon}>
      You are here
    </ListItem>
  ) : null;

  const getIcon = (style) => (
    <Avatar
      className='map-legend-icon'
      style={styles.mapLegendIcon}
      backgroundColor={style}/>
  );

  return (
    <div id='map-legend' className='map-legend-container' style={styles.mapLegendContainer}>
      <List className='map-legend' style={styles.mapLegend}>
        {youAreHereListItem}
        <ListItem
          style={styles.mapLegendItem}
          disabled={true}
          leftAvatar={getIcon(STATUS_COLORS.OFFLINE)}>
            Offline
        </ListItem>
        <ListItem
          style={styles.mapLegendItem}
          disabled={true}
          leftAvatar={getIcon(STATUS_COLORS.BOOKED)}>
            Booked
        </ListItem>
        {enableMotion || enableStalls ? [
          <ListItem
            key='squatted'
            style={styles.mapLegendItem}
            disabled={true}
            leftAvatar={getIcon(STATUS_COLORS.SQUATTED)}>
              Squatted
          </ListItem>,
          <ListItem
            key='abandonded'
            style={styles.mapLegendItem}
            disabled={true}
            leftAvatar={getIcon(STATUS_COLORS.ABANDONED)}>
              Abandoned
          </ListItem>
        ] : null}
        <ListItem
          style={styles.mapLegendItem}
          disabled={true}
          leftAvatar={getIcon(STATUS_COLORS.VACANT)}>
            Vacant
        </ListItem>
        <ListItem
          style={styles.mapLegendItem}
          disabled={true}
          leftAvatar={getIcon(STATUS_COLORS.FIVE_MINUTE_WARNING)}>
            Five minute warning
        </ListItem>
        <ListItem
          style={styles.mapLegendItem}
          disabled={true}
          leftAvatar={getIcon(STATUS_COLORS.ONE_MINUTE_WARNING)}>
            One minute warning
        </ListItem>
      </List>
    </div>
  );
};

MapLegend.propTypes = {
  enabled: PropTypes.bool,
  showYouAreHere: PropTypes.bool.isRequired,
  enableMotion: PropTypes.bool.isRequired,
  enableStalls: PropTypes.bool.isRequired
};

export default applyStyles(MapLegend);
