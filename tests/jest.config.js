/* eslint-env node, jest */
import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // TODO swap back to official adapter when it's released

// https://material-ui.com/style/typography/#migration-to-typography-v2
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; // eslint-disable-line

configure({ adapter: new Adapter() });
