import { css } from 'emotion';

import { colors, fonts } from 'components/common/styles/base';

const stylesGenerator = () => ({
  base: css`
    cursor: pointer;

    > li {
      background-color: ${colors.WHITE};
      transition: all 120ms ease-in-out;

      :hover {
        background-color: ${colors.secondary};
      }

      div {
        z-index: 1;
      }
    }
  `,

  navIcons: css`
    margin: 0 0 0 24px;
  `,

  tempIconAdjust: css`
    margin: 0 0 0 6px;
    span {
      font-family: Arial;
    }
  `,

  note: css`
    font: 14px ${fonts.secondary}, sans-serif;
  `
});

export default stylesGenerator;
