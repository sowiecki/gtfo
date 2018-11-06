import { css } from 'emotion';

import { STATUS_COLORS } from 'client/constants';

const stylesGenerator = ({ meetingRoom }) => ({
  base: css`
    pointer-events: all;
    position: absolute;
    top: 48px;
    color: black;
    height: 100%;
    width: 100%;
    background-color: ${STATUS_COLORS[meetingRoom.alert]};
  `
});

export default stylesGenerator;
