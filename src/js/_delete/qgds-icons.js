
const iconSVG = (iconID) => {
  let path = `assets/img/health-icon-sprite.svg#${iconID}`;
  return `
          <svg class="qgds-icon" data-name="${iconID}">
            <use href="${path}"></use>
          </svg>
        `;
};

const QGDSIcons = {
  icons: {
    "chevron-up": `assets/img/health-icon-sprite.svg#chevron-up`,
    "chevron-down": `assets/img/health-icon-sprite.svg#chevron-down`,
    "arrow-left": iconSVG('arrow-left'),
    "arrow-right": iconSVG('arrow-right'),
  },
};

  
export default QGDSIcons;
