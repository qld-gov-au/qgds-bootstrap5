import iconNames from "./_icons.list.js";
import storyInlineWithTextHtml from "./stories/storyInlineWithText.html?raw";
import storyFlexContainerHtml from "./stories/storyFlexContainer.html?raw";
import storySizesHtml from "./stories/storySizes.html?raw";

import metadata from "./metadata.json";

const SPRITE_PATH = "./assets/img/icons-sprite.svg";
const PREFIX_QGDS = "qgds-icon-";

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
  parameters: {
    layout: "padded",
    docs: {
      title: "Iconography in default",
      // page: null, // To disable autodocs
    },
    coderefs: {
      show: false,
    },
  },
};

// Story for displaying all icons as SVGs
export const SvgIcons = () => {
  return `
    <div class="container">
    <div class="row row-cols-sm-2 row-cols-lg-4 row-cols-xl-5 g-4">
      ${iconNames
        .map((name) => {
          return `
          <div class="col">
            <div class="card">
              <div class="card-body" style="text-align: center">
                <div class="mt-12 mb-4">
                  <svg class="qld-icon qld-icon-xl" aria-label="${_removePrefixQGDS(name)} icon" role="img" width="32" height="32" viewBox="0 0 32 32" focusable="false">
                    <use href="${SPRITE_PATH}#${PREFIX_QGDS}${name}" />
                  </svg>
                </div>
                <small>${_removePrefixQGDS(name)}</small><br><code style="font-size: 0.75rem"> #${PREFIX_QGDS}${name}</code>
              </div>
            </div>
          </div>
          `;
        })
        .join("")}
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
        .map((name) => {
          return `
          <div class="col">
            <div class="card">
              <div class="card-body" style="text-align: center">
                <div class="mt-12 mb-4">
                  <span class="qld-icon qld-icon-xl qld-icon-${name}"></span>
                </div>
                <small>${_removePrefixQGDS(name)}</small><br><code style="font-size: 0.75rem">qld-icon-${name}</code>
              </div>
            </div>
          </div>`;
        })
        .join("")}
    </div>
    </div>
  `;
};
CssIcons.storyName = "CSS Icons";

export const Sizes = () => storySizesHtml;

export const FlexContainer = () => storyFlexContainerHtml;

export const InlineWithText = () => storyInlineWithTextHtml;
