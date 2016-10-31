import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoomsController from './controller';

import * as RoomsActions from '../../ducks/layout';

const mapStateToProps = ({ layoutReducer }) => ({
  error: layoutReducer.get('error'),
  meetingRooms: layoutReducer.get('meetingRooms'),
  ping: layoutReducer.get('ping'),
  stalls: layoutReducer.get('stalls'),
  markers: layoutReducer.get('markers'),
  displayLegend: layoutReducer.get('displayLegend'),
  displayTemp: layoutReducer.get('displayTemp'),
  enableMotion: layoutReducer.get('enableMotion'),
  unitOfTemp: layoutReducer.get('unitOfTemp')
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(RoomsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomsController);
