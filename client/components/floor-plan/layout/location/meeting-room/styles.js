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
  const getFontSize = (widthModifier) =>
    ({
      3: 'font-size: 12px;',
      2: 'font-size: 7px;',
      1: 'font-size: 5px;'
    }[widthModifier]);

  return {
    base: css`
      cursor: pointer;
      fill: ${STATUS_COLOR};
      transition: all 250ms ease-in-out;

      > svg > circle {
        opacity: 0.1;
        fill: ${connectedStatus ? STATUS_COLOR : colors.DARK_RED};
      }

      .tooltip {
        color: red !important;
      }
    `,

    textContainer: (widthModifier) => css`
      text {
        pointer-events: none;
        stroke: none;
        font-family: ${fonts.secondary};
        ${getFontSize(widthModifier)}
        fill: ${statusColorLum < 0.5 ? colors.WHITE : colors.DARK_GREY};
        letter-spacing: 0.2;
        text-transform: capitalize;
        transition: all 250ms ease-in-out;

        ${breakpoints.mobile} {
          transform: scale(0.6);
        }

        ${breakpoints.mobile_iphone5} {
          transform: scale(0.4);
        }

        font-weight: 800;
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
      pointer-events: none;

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
