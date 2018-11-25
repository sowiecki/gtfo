import { css } from 'emotion';
import Color from 'color';

import { fonts, breakpoints, colors, STATUS_COLOR_THEMES } from 'components/common/styles';

const stylesGenerator = ({ displayTemp, widthModifier, meetingRoom, statusesTheme }) => {
  const STATUS_COLOR = STATUS_COLOR_THEMES[statusesTheme][meetingRoom.alert];
  const statusColorLum = Color(STATUS_COLOR).luminosity();
  const getFontSize = () =>
    ({
      3: 'font-size: 10px;',
      2: 'font-size: 8px;',
      1: 'font-size: 5px;'
    }[widthModifier]);

  return {
    base: css`
      text {
        ${getFontSize()}
        font-family: ${fonts.secondary};
        fill: ${statusColorLum < 0.5 ? colors.WHITE : colors.DARK_GREY};
        opacity: ${displayTemp ? 1 : 0};
        transition: all 250ms ease-in-out;

        ${breakpoints.mobile} {
          font-size: 4px;
        }
      }
    `
  };
};

export default stylesGenerator;
