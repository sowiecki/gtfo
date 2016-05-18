import transitions from './transitions';
import { colors } from './base';

export const rules = {
  body: {
    'html, body, #root, #root > div': {
      position: 'absolute',
      margin: '0',
      height: '100%',
      width: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      backgroundColor: colors.GHOST_WHITE
    },

    '*': {
      boxSizing: 'border-box'
    },

    ...transitions
  }
};
