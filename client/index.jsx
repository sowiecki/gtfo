/* globals document */
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

import React from 'react';
import { render } from 'react-dom';

import Application from './application';

const node = document.getElementById('root');

render(<Application/>, node);
