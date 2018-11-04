import { css } from 'emotion';

import { colors, fontStyles } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    position: absolute;
    right: 200px;
    bottom: 20px;

    li {
      > div {
        margin: 0 10px 0 0;
      }

      ${fontStyles.primary};
      font-size: 22px;
    }
  `,

  icon: (color) => css`
    color: ${color};
  `,

  closeButton: css`
    position: absolute;
    top: 0;
    right: 0;
  `,

  mapLegend: css`
    padding: 30px 0 0 0;
    margin: 0 auto 0 28%;
    zoom: 0.6;
    width: 280px;
    background-color: ${colors.WHITE};
    border: 1px solid ${colors.GREY};

    > div > div {
      textshadow: 1px 1px 0 ${colors.WHITE};
    }
  `,

  mapLegendIcon: css`
    top: -8px;
    left: 2px;
    transform: scale(0.35);
  `
});

export default stylesGenerator;
