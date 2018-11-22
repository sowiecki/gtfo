import { css } from 'emotion';

import { colors, breakpoints } from 'components/common/styles';

const stylesGenerator = ({ statusesTheme }) => ({
  header: css`
    height: 24px;
    margin: 12px;
    padding: 0;
    background-color: ${colors.DARK_GREY};
    font-size: 20px;

    > button {
      position: absolute;
      top: 0;
      right: 0;
      color: ${colors.WHITE};
    }
  `,

  table: css`
    color: ${colors.WHITE};

    h3 {
      margin: 0;
    }

    td {
      border: 1px solid ${colors.DARK_GREY};
      vertical-align: top;
      min-width: 70px;
      transition: all 120ms ease-in-out;
      cursor: pointer;
      font-size: 12px;

      h3 {
        font-size: 10px;
      }

      ${breakpoints.mobile} {
        h3 {
          font-size: 8px;
        }
        min-width: 70px;
      }

      :hover,
      :active {
        background-color: ${colors.GREY};
      }

      ul {
        padding: 0;

        li {
          padding: 10px;
        }
      }
    }

    td:nth-child(1) {
      width: 180px;
      cursor: inherit;

      :hover,
      :active {
        background-color: ${colors.DARK_GREY};
      }
    }
  `,

  list: (key) => {
    const border = key === statusesTheme ? `border: 1px solid ${colors.GREY};` : null;

    return css`
      > ul {
        ${border}
      }
    `;
  }
});

export default stylesGenerator;
