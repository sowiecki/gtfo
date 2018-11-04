import { css } from 'emotion';

import { colors, fonts } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    height: 80px;
    width: 100%;
    text-align: center;
    border-radius: 0;
    background-color: ${colors.DARK_GREY};
  `,

  drawer: css`
    pointer-events: none;
    background: none;

    > div {
      pointer-events: none;
      background: none;
    }
  `,

  timeDisplay: css`
    padding: 2px;
    font: 24px ${fonts.secondary}, sans-serif;
    color: ${colors.WHITE};
  `,

  timeTravelDismiss: css`
    position: absolute;
    right: 0;
    pointer: cursor;
    pointer-events: all;

    span {
      color: ${colors.WHITE};
    }
  `
});

export default stylesGenerator;
