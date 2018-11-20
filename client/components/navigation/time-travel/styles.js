import { css } from 'emotion';

import { colors, fonts } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    height: 80px;
    width: 100%;
    text-align: center;
    border-radius: 0;
    pointer-events: none;

    > div:nth-child(1) {
      display: none;
    }

    > div:nth-child(2) {
      pointer-events: all;
      height: 80px;
      background-color: ${colors.DARK_GREY};
      border-radius: 0;

      // Necessary to keep the slider visible in Firefox on the prod build
      // Putting this position on the <Slider /> class itself isn't enough
      > div {
        position: absolute;
      }
    }
  `,

  timeDisplay: css`
    padding: 2px;
    font: 24px ${fonts.tertiary}, sans-serif;
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
