import { css } from 'emotion';
import { get } from 'lodash';
import Color from 'color';

import { colors, fonts, breakpoints, STATUS_COLOR_THEMES } from 'components/common/styles';

const stylesGenerator = ({
  meetingRoom,
  ping = {},
  statusesTheme,
  connectedStatus,
  displayAdditionalInfo
}) => {
  const pinged = meetingRoom.name.toLowerCase() === get(ping, 'id', '').toLowerCase();
  const animation = pinged ? 'animation: backgroundColor 0.25s infinite alternate;' : '';
  const STATUS_COLOR = STATUS_COLOR_THEMES[statusesTheme][meetingRoom.alert];
  const statusColorLum = Color(STATUS_COLOR).luminosity();

  return {
    base: css`
      cursor: pointer;
      fill: ${STATUS_COLOR};
      transition: all 250ms ease-in-out;

      > svg > circle {
        opacity: 0.1;
        fill: ${connectedStatus ? STATUS_COLOR : colors.DARK_RED};
      }
    `,

    textContainer: css`
      text {
        stroke: none;
        font-family: ${fonts.secondary};
        font-size: ${meetingRoom.coordinates.width < 5 ? 8 : 10}px;
        fill: ${statusColorLum < 0.5 ? colors.WHITE : colors.DARK_GREY};
        letter-spacing: 0.2;
        text-transform: capitalize;
        transition: all 250ms ease-in-out;

        ${breakpoints.mobile} {
          font-size: 6px;
        }

        ${breakpoints.mobile_iphone5} {
          font-size: 4px;
          transform: translate(0, -6px);
        }
      }
    `,

    pinged: css`
      @keyframes backgroundColor {
        from {
          fill: ${STATUS_COLOR_THEMES[statusesTheme].PINGED};
        }
      }

      transition: all 250ms ease-in-out;
      ${animation}

      :hover, :active {
        opacity: 0.4;
        fill: ${colors.LIGHT_GREY};
      }
    `,

    offlineMarker: css`
      > path {
        opacity: ${displayAdditionalInfo ? 1 : 0};
        color: ${colors.DARK_RED};
        transform: scale(0.02);
        transition: all 250ms ease-in-out;
      }
    `
  };
};

export default stylesGenerator;
