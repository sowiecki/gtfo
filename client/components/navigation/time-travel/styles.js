import { css } from 'emotion';

import { colors, fonts } from 'components/common/styles';

const stylesGenerator = ({ timeTravelControlsOpen }) => ({
  base: css`
    position: absolute;
    height: 80px;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: ${colors.DARK_GREY};
    opacity: ${timeTravelControlsOpen ? 1 : 0};
    border-radius: 0;
    z-index: 1;
  `,

  timeDisplay: css`
    padding: 2px;
    font: 24px ${fonts.secondary}, sans-serif;
    color: ${colors.WHITE};
  `,

  timeTravelDismiss: css`
    position: absolute;
    left: 0;
  `
});

export const TIME_TRAVEL_DISMISS_COLOR = colors.WHITE;

export default stylesGenerator;
