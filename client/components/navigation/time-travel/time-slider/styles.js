import { css } from 'emotion';

import { colors, fonts } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    margin: 16px auto;
    // position: absolute !important;
    // right: 0;
    // left: 0;
    // top: 0;
    max-width: 70%;
    width: 400px;
    height: 10px;

    div {
      pointer-events: all;
      // top: 30px;

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
    margin: auto;
    left: 0;
    right: 0;
    bottom: 2px;
    font: 12px ${fonts.tertiary}, sans-serif;
    color: ${colors.WHITE};
  `
});

export default stylesGenerator;
