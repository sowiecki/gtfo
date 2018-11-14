/* eslint react/no-set-state:0 */
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { TIME_FORMAT } from 'client/constants';

let interval;

class CurrentTime extends PureComponent {
  static propTypes = {
    timezone: PropTypes.number.isRequired
  };

  state = {
    currentTime: moment()
  };

  componentDidMount() {
    interval = setInterval(this.tick, 100);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  tick = () => {
    this.setState({ currentTime: moment() });
  };

  renderTime = () => this.state.currentTime.utcOffset(this.props.timezone).format(TIME_FORMAT);

  render() {
    const { timezone } = this.props;
    const localUTCOffset = moment().utcOffset();

    return localUTCOffset === timezone ? this.renderTime() : `${this.renderTime()} (local)`;
  }
}

export default CurrentTime;
