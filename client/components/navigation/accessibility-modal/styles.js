import { css } from 'emotion';

// import { ONE_MINUTE_WARNING, FIVE_MINUTE_WARNING, STATUS_COLORS } from 'client/constants';
import { colors, fonts, breakpoints } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    top: 25%;
    right: 0;
    left: 0;
    margin: auto;
    position: absolute;
    width: 500px;
    height: auto;
    background: ${colors.DARK_GREY};
    pointer-events: all;
    font-family: ${fonts.secondary};
    letter-spacing: 0.7;
    color: ${colors.WHITE};

    ${breakpoints.mobile} {
      width: 400px;
    }
  `,

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
      vertical-align: top;
      min-width: 86px;
      transition: all 120ms ease-in-out;
      cursor: pointer;
      font-size: 12px;

      ${breakpoints.mobile} {
        font-size: 10px;
      }

      :hover {
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

      :hover {
        background-color: ${colors.DARK_GREY};
      }
    }
  `
});

export default stylesGenerator;
