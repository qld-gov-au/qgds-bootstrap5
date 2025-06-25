import iconNames from "./_icons.list.js";
import { Card } from '../card/Card.js';
import iconUsageHtml from './story-icon-usage.html?raw';
import iconSizingHtml from './story-icon-sizing.html?raw';

const defaultdata = {
    "title": "Card title",
    "description": "Card body text",
    "date": "",
    "variantClass": "default",
    "image": "",
    "imageAlt": "",
    "iconClasses": "",
    "iconPosition": "icon-top",
    "action": "no",
    "link": "",
    "arrow": false,
    "feature": false,
    "featureImagePosition": "",
    "video": false,
    "videoDuration": "",
    "footer": "",
    "equalHeight": false
  };
const SPRITE_PATH = './assets/img/_icon-sprite.svg';
const PREFIX_QGDS = 'qgds-icon-';

// Helper function to remove the prefix from icon names
function _removePrefixQGDS(name) {
  if (name.startsWith(PREFIX_QGDS)) {
    return name.slice(PREFIX_QGDS.length);
  }
  return name;
}


// Default export for Storybook
export default {
  tags: ["autodocs"],
  title: "1. Core Styles/Iconography",
  render: () => {
    return iconUsageHtml + `<hr>` + iconSizingHtml;
  },
  parameters: {
    layout: "padded",
    docs: {
    title: "Iconography in default",
    // page: null, // To disable autodocs 
    }
  },
};

// Exports default as Overview, in order to avoid another "Default" menu in Storybook
export const Overview = {};

// Story for displaying all icons as SVGs
export const SvgIcons = () => {
  return `
    <div class="container">
    <div class="row row-cols-sm-2 row-cols-lg-4 row-cols-xl-5 g-4">
      ${iconNames
        .map(name => 
          {
          return new Card({
            ...defaultdata,
            title: ``,  // Overrides card title to empty string
            description: `
                <div class="mb-4">
                  <svg class="qld-icon-xl" aria-label="${_removePrefixQGDS(name)} icon" role="img" width="32" height="32" viewBox="0 0 32 32" focusable="false">
                    <use href="${SPRITE_PATH}#${PREFIX_QGDS}${name}" />
                  </svg>
                </div>
                <small>${_removePrefixQGDS(name)}</small><br><code style="font-size: 0.75rem"> #qdgs-icon-${name}</code>
                `,
          }).html
        })
        .join('')}
    </div>
    </div>
  `;
};
SvgIcons.storyName = "SVG Icons";

// Story for displaying all icons using CSS utility classes
export const CssIcons = () => {
  return `
    <div class="container">
    <div class="row row-cols-sm-2 row-cols-lg-4 row-cols-xl-5 g-4">
      ${iconNames
        .map(name => new Card({
            ...defaultdata,
            title: ``,  // Override card title to empty string
            description: `
                <div class="mb-4">
                  <span class="qld-icon qld-icon-xl qld-icon-${name}"></span>
                </div>
                <small>${_removePrefixQGDS(name)}</small><br><code style="font-size: 0.75rem">qld-icon-${name}</code>
                `,
            iconClasses: ``,
          }).html)
        .join('')}
    </div>
    </div>
  `;
};
CssIcons.storyName = "CSS Icons";

// Story for displaying icon sizing variations
export const Sizes = () => {
  return iconSizingHtml;
};

