/* eslint-env node, mocha */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const context = require.context('./client', true, /spec\.js(x|)?$/);
context.keys().forEach(context);
