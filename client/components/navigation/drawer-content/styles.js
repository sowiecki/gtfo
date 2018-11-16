import { css } from 'emotion';

import { colors, fonts } from 'components/common/styles/base';

const stylesGenerator = () => ({
  base: css`
    height: 100%;
    width: 300px;
    cursor: pointer;
    background-color: ${colors.DARK_GREY};

    > li {
      background-color: ${colors.DARK_GREY};
      transition: all 120ms ease-in-out;

      :hover {
        background-color: ${colors.primary};
      }

      div {
        span {
          color: ${colors.WHITE};
        }
        background: none;
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

    span > a,
    a:visited {
      color: ${colors.primary};
    }
  `
});

export default stylesGenerator;
