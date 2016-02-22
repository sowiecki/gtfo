import { colors } from '../common/styles';

const { primary, WHITE } = colors;

export const styles = {
  toolbar: {
    backgroundColor: primary,
    height: '48px'
  },

  toolbarTitle: {
    margin: '0',
    color: WHITE,
    fontSize: '35px',
    lineHeight: '48px',
    fontWeight: '8',
    fontFamily: `'Wire One', sans-serif`
  },

  toolbarTabs: {
    margin: '0 0 0 -4px'
  },

  toolbarTab: {
    minWidth: '200px',
    backgroundColor: primary
  },

  menuButton: {
    color: WHITE,
    pointerEvents: 'all'
  },

  navIcons: {
    marginLeft: '24'
  }
};
