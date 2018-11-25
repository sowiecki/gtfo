import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { formatLocationProps } from 'utils';
import * as LayoutActions from 'ducks/layout';
import * as NavigationActions from 'ducks/navigation';

import FloorPlanController from './controller';

const mapStateToProps = ({ layoutReducer, navigationReducer, router }) => ({
  location: formatLocationProps(router.location),
  error: layoutReducer.get('error'),
  displayAdditionalInfo: layoutReducer.get('displayAdditionalInfo'),
  meetingRooms: layoutReducer.get('meetingRooms'),
  ping: layoutReducer.get('ping'),
  stalls: layoutReducer.get('stalls'),
  markers: layoutReducer.get('markers'),
  displayLegend: layoutReducer.get('displayLegend'),
  displayTemp: layoutReducer.get('displayTemp'),
  enableMotion: layoutReducer.get('enableMotion'),
  enableStalls: layoutReducer.get('enableStalls'),
  unitOfTemp: layoutReducer.get('unitOfTemp'),
  statusesTheme: layoutReducer.get('statusesTheme'),
  timezone: navigationReducer.get('timezone')
});

const mapDispatchToProps = (dispatch) => {
  const actions = {
    ...LayoutActions,
    ...NavigationActions,
    push
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FloorPlanController);
