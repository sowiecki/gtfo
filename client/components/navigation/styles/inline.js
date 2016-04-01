import { colors, fonts } from '../../common/styles';

export const styles = {
  toolbar: {
    backgroundColor: colors.primary,
    height: '48px'
  },

  toolbarTitle: {
    margin: '0',
    color: colors.WHITE,
    fontSize: '35px',
    lineHeight: '48px',
    fontWeight: '8',
    fontFamily: fonts.primary
  },

  toolbarTabs: {
    margin: '0 0 0 -4px'
  },

  toolbarTab: {
    minWidth: '200px',
    backgroundColor: colors.primary
  },

  menuButton: {
    color: colors.WHITE,
    pointerEvents: 'all'
  },

  navIcons: {
    marginLeft: '24'
  }
};
