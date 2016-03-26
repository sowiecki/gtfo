import React, { PropTypes } from 'react';

import { List, ListItem, Avatar } from 'material-ui/lib';
import Place from 'material-ui/lib/svg-icons/maps/place';

import { applyStyles } from '../../config/composition';
import { styles } from './styles';

const MapLegend = ({ showYouAreHere, enabled }) => {
  if (!enabled) {
    return null;
  }

  const placeIcon = (
    <Avatar color={styles.placeMarker.fill} icon={<Place/>}/>
  );

  const youAreHereListItem = showYouAreHere ? (
    <ListItem style={styles.mapLegendItem} disabled={true} leftAvatar={placeIcon}>
      You are here
    </ListItem>
  ) : null;

  const offlineIcon = (
    <Avatar backgroundColor={styles.OFFLINE}/>
  );

  const bookedIcon = (
    <Avatar backgroundColor={styles.BOOKED}/>
  );

  const vacantIcon = (
    <Avatar backgroundColor={styles.VACANT}/>
  );

  const fiveMinuteWarningIcon = (
    <Avatar backgroundColor={styles.FIVE_MINUTE_WARNING}/>
  );

  const oneMinuteWarningIcon = (
    <Avatar backgroundColor={styles.ONE_MINUTE_WARNING}/>
  );

  return (
    <List className='map-legend'>
      {youAreHereListItem}
      <ListItem style={styles.mapLegendItem} disabled={true} leftAvatar={offlineIcon}>
        Offline
      </ListItem>
      <ListItem style={styles.mapLegendItem} disabled={true} leftAvatar={bookedIcon}>
        Booked
      </ListItem>
      <ListItem style={styles.mapLegendItem} disabled={true} leftAvatar={vacantIcon}>
        Vacant
      </ListItem>
      <ListItem style={styles.mapLegendItem} disabled={true} leftAvatar={fiveMinuteWarningIcon}>
        Five minute warning
      </ListItem>
      <ListItem style={styles.mapLegendItem} disabled={true} leftAvatar={oneMinuteWarningIcon}>
        One minute warning
      </ListItem>
    </List>
  );
};

MapLegend.propTypes = {
  enabled: PropTypes.bool,
  showYouAreHere: PropTypes.bool.isRequired
};

export default applyStyles(MapLegend);
