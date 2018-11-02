import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { formatLocationProps } from 'utils';
import * as LayoutActions from 'ducks/layout';
import * as NavigationActions from 'ducks/navigation';

import RoomsController from './controller';

const mapStateToProps = ({ layoutReducer, router }) => ({
  location: formatLocationProps(router.location),
  error: layoutReducer.get('error'),
  meetingRooms: layoutReducer.get('meetingRooms'),
  ping: layoutReducer.get('ping'),
  stalls: layoutReducer.get('stalls'),
  markers: layoutReducer.get('markers'),
  displayLegend: layoutReducer.get('displayLegend'),
  displayTemp: layoutReducer.get('displayTemp'),
  enableMotion: layoutReducer.get('enableMotion'),
  enableStalls: layoutReducer.get('enableStalls'),
  unitOfTemp: layoutReducer.get('unitOfTemp')
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
)(RoomsController);
