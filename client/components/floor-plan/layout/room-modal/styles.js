import { css } from 'emotion';

import { ONE_MINUTE_WARNING, FIVE_MINUTE_WARNING, STATUS_COLORS } from 'client/constants';
import { colors, fonts, breakpoints } from 'components/common/styles';

const stylesGenerator = ({ meetingRoom }) => ({
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

    > h1 {
      margin: 0;
      font-family: ${fonts.secondary};
      font-size: 40px;

      ${breakpoints.tablet} {
        font-size: 80px;
      }
    }
  `,

  footer: css`
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: ${colors.GREY};

    > button {
      margin: auto;
      font-size: 20px;
      color: ${colors.DARK_GREY};
      background-color: ${colors.LIGHT_GREY};
      border: 1px solid ${colors.DARK_GREY};
      outline: none;
      pointer-events: all;
      transition: all 100ms ease-in;
      font-family: ${fonts.secondary};

      :hover,
      :active {
        cursor: pointer;
        color: ${colors.LIGHT_GREY};
        background-color: ${colors.DARK_GREY};
        border: 1px solid ${colors.LIGHT_GREY};
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

      margin: 20px auto 20px;
      padding: 20px;
      width: 100%;
      font-size: 26px;
      font-family: ${fonts.secondary};
      background-color: ${STATUS_COLORS[meetingRoom.alert]};
      transition: all 120ms ease-in-out;
      ${animation}

      ${breakpoints.tablet} {
        margin: 20px auto 90px;
        font-size: 90px;
      }
    `;
  },

  currentReservation: css`
    font-size: 18px;
    font-family: ${fonts.secondary};

    ${breakpoints.tablet} {
      font-size: 60px;
    }

    > div:nth-child(1) {
      font-size: 14px;
      // padding: 20px;
      margin: auto;
      width: auto;
      font-family: ${fonts.tertiary};
    }
  `
});

export default stylesGenerator;
