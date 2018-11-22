import { css } from 'emotion';

import { ONE_MINUTE_WARNING, FIVE_MINUTE_WARNING } from 'client/constants';
import { colors, fonts, breakpoints, STATUS_COLOR_THEMES } from 'components/common/styles';

const stylesGenerator = ({ statusesTheme }) => ({
  base: css`
    text-align: center;
    pointer-events: all;
    position: relative;
    top: 0;
    padding: 20px 0 0 0;
    color: black;
    height: 100%;
    width: 100%;
    color: ${colors.WHITE};
    background: ${colors.DARK_GREY};
  `,

  footer: css`
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;

    > button {
      margin: auto;
      font-size: 20px;
      color: ${colors.LIGHT_GREY};
      outline: none;
      pointer-events: all;
      transition: all 100ms ease-in;
      font-family: ${fonts.secondary};
      background: none;
      border: none;

      :hover,
      :active {
        cursor: pointer;
        color: ${colors.WHITE};
      }

      .material-icons {
        vertical-align: middle;
      }
    }
  `,

  status: (alert) => {
    const animation = [ONE_MINUTE_WARNING, FIVE_MINUTE_WARNING].includes(alert)
      ? 'animation: backgroundColor 1s infinite alternate;'
      : '';

    return css`
      @keyframes backgroundColor {
        from {
          background-color: ${colors.DARK_GREY};
        }
      }

      > div:nth-child(1) {
        position: relative;
        margin: auto;
        text-align: left;
        max-width: 500px;
        font-size: 40px;

        .left {
          font-size: 22px;

          .material-icons {
            vertical-align: bottom;
          }

          ${breakpoints.mobile} {
            font-size: 18px;
          }

          .reservation-details {
            margin: 10px 0 0 0;
            font-size: 16px;

            ${breakpoints.mobile} {
              font-size: 14px;
            }
          }
        }

        .right {
          position: absolute;
          right: 0;
          bottom: 0;
          font-size: 16px;

          ${breakpoints.mobile} {
            font-size: 14px;
          }
        }

        .left,
        .right {
          line-height: 1;
        }
      }

      margin: 20px auto 20px;
      padding: 20px;
      width: 100%;
      font-size: 26px;
      font-family: ${fonts.secondary};
      background-color: ${STATUS_COLOR_THEMES[statusesTheme][alert]};
      transition: all 120ms ease-in-out;
      ${animation}

      ${breakpoints.tablet} {
        margin: 20px auto 90px;
        font-size: 90px;
      }
    `;
  }
});

export default stylesGenerator;
