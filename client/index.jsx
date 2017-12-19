/* globals document */
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

import { render } from 'react-dom';

import Application from './application';

const node = document.getElementById('root');

render(Application, node);

if (module.hot) {
  module.hot.accept('./application', () => {
    render(Application, node);
  });
}
