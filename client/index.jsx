/* globals document */
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Application from './application';

injectTapEventPlugin();

const node = document.getElementById('root');

render(Application, node);

if (module.hot) {
  module.hot.accept('./application', () => {
    render(Application, node);
  });
}
