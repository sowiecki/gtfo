import { css } from 'emotion';

import { colors, fonts } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    margin: 2px auto;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    max-width: 70%;
    width: 400px;
    height: 10px;

    div {
      pointer-events: all;
      top: 22px;

      div {
        background-color: ${colors.primary};

        button {
          background-color: ${colors.primary};
        }
      }
    }
  `,

  timeHintText: css`
    position: absolute;
    font: 12px ${fonts.secondary}, sans-serif;
    margin: auto;
    fontsize: 12px;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${colors.WHITE};
  `,

  timeUnavailableText: css`
    font: 12px ${fonts.secondary}, sans-serif;
    lineheight: 1.25;
    color: ${colors.WHITE};
  `
});

export default stylesGenerator;
