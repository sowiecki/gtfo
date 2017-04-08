import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoomsController from './controller';

import * as LayoutActions from '../../ducks/layout';
import * as NavigationActions from '../../ducks/navigation';

const mapStateToProps = ({ layoutReducer, navigationReducer }, props) => ({
  location: { ...props.location, ...navigationReducer.get('location').toJS() },
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
    ...NavigationActions
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomsController);
