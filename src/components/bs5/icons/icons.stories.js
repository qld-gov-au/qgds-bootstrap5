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
const iconSpritePath = './assets/img/_icon-sprite.svg';
const prefixIconQgds = 'qgds-icon-';
const stripPrefix = (name, prefix = 'qgds-icon-') =>
  name.startsWith(prefix) ? name.slice(prefix.length) : name;


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
    // page: null, // Disable autodocs 
    }
  },
};

// Exports "default" as Overview, to avoid another "Default" menu item in Storybook
export const Overview = {};


// @TODO: Test this with colour
export const SvgIcons = () => {
  return `
    <div class="container">
    <div class="row row-cols-3 row-cols-sm-4 row-cols-lg-5 row-cols-xl-6 g-4">
      ${iconNames
        .map(name => 
          {
          return new Card({
            ...defaultdata,
            title: ``,  // Overrides card title to empty string
            description: `
                <div class="mb-4">
                  <svg class="qld-icon--xl" aria-label="${stripPrefix(name)} icon" role="img" width="32" height="32" viewBox="0 0 32 32" focusable="false">
                    <use href="${iconSpritePath}#${prefixIconQgds}${name}" />
                  </svg>
                </div>
                <small>${stripPrefix(name)}</small><pre style="font-size: 0.75rem"> #qdgs-icon-${name}</pre>
                `,
          }).html
        })
        .join('')}
    </div>
    </div>
  `;
};
SvgIcons.storyName = "SVG Icons";

export const CssIcons = () => {
  return `
    <div class="container">
    <div class="row row-cols-3 row-cols-sm-4 row-cols-lg-5 row-cols-xl-6 g-4">
      ${iconNames
        .map(name => new Card({
            ...defaultdata,
            title: ``,  // Override card title to empty string
            description: `<small>${stripPrefix(name)}</small><pre style="font-size: 0.75rem">qld-icon-${name}</pre>`,
            iconClasses: `qld-icon qld-icon-xl qld-icon-${name}`,
          }).html)
        .join('')}
    </div>
    </div>
  `;
};
CssIcons.storyName = "CSS Icons";

export const Sizes = () => {
  return iconSizingHtml;
};

