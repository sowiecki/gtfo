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

  const getIcon = (style) => (
    <Avatar backgroundColor={style}/>
  );

  return (
    <List className='map-legend'>
      {youAreHereListItem}
      <ListItem
        style={styles.mapLegendItem}
        disabled={true}
        leftAvatar={getIcon(styles.OFFLINE)}>
          Offline
      </ListItem>
      <ListItem
        style={styles.mapLegendItem}
        disabled={true}
        leftAvatar={getIcon(styles.BOOKED)}>
          Booked
      </ListItem>
      <ListItem
        style={styles.mapLegendItem}
        disabled={true}
        leftAvatar={getIcon(styles.SQUATTED)}>
          Occupied, no reservation
      </ListItem>
      <ListItem
        style={styles.mapLegendItem}
        disabled={true}
        leftAvatar={getIcon(styles.VACANT)}>
          Vacant
      </ListItem>
      <ListItem
        style={styles.mapLegendItem}
        disabled={true}
        leftAvatar={getIcon(styles.FIVE_MINUTE_WARNING)}>
          Five minute warning
      </ListItem>
      <ListItem
        style={styles.mapLegendItem}
        disabled={true}
        leftAvatar={getIcon(styles.ONE_MINUTE_WARNING)}>
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
