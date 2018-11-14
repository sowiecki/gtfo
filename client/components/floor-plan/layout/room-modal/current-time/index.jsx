/* eslint react/no-set-state:0 */
import { PureComponent } from 'react';
import moment from 'moment';

import { TIME_FORMAT } from 'client/constants';

let interval;

class CurrentTime extends PureComponent {
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

  render() {
    return this.state.currentTime.format(TIME_FORMAT);
  }
}

export default CurrentTime;
