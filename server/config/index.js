/* eslint no-console:0 */
/* globals console */
import path from 'path';
import colors from 'colors/safe';
import { argv } from 'yargs';

export * from '../../universal/config';

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

if (argv.mocks) {
  process.env.MOCKS = true;
  console.log(colors.gray.italic('Using mock data'));
}

if (argv.dhc) {
  process.env.DONT_HOOK_CONSOLE = true;
  console.log(colors.gray.italic('Not hooking into console.log, output may be messy\n'));
}

if (argv.dd) {
  process.env.DISABLE_DEVICES = true;
  console.log(colors.gray.italic('Devices disabled'));
}

export const IS_PROD_ENV = process.env.NODE_ENV === 'production';
export const IS_TEST_ENV = process.env.NODE_ENV === 'test';
export const DEVICES_ENABLED = !process.env.DISABLE_DEVICES;

export const SERVER_PORT = normalizePort(process.env.PORT || '3000');

const ROOT = '../';
export const PUBLIC_PATH = path.join(__dirname, ROOT, 'public');
export const BUNDLE_PATH = '/dist/bundle.js';
export const VIEWS_PATH = path.join(__dirname, ROOT, 'views');

/**
 * Blessed configurations.
 */

const title = 'Office Insights'.toUpperCase();
export const titleOptions = {
  display: title,
  segmentWidth: 0.04,
  segmentInterval: 0.02,
  elementSpacing: 0.2,
  elements: title.length,
  color: 'green',
  style: {
    border: { fg: 'green' }
  }
};

export const logOptions = {
  label: 'Server Log',
  width: '65%',
  height: '100%',
  border: 'line',
  style: {
    fg: 'white',
    border: { fg: 'cyan' }
  }
};

export const tableOptions = {
  label: 'Room statuses',
  width: '35%',
  height: '100%',
  interactive: false,
  columnWidth: [13, 20, 16],
  columnSpacing: 4,
  fg: 'white',
  border: {
    type: 'line',
    fg: 'cyan'
  }
};

export const guageOptions = {
  label: 'Room utilization',
  style: {
    border: { fg: 'yellow' }
  }
};

export const markdownOptions = {
  label: 'Uptime',
  columnWidth: [13],
  columnSpacing: 4
};
