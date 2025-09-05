// ComponentExample.stories.js
/**
 * @file linkColumns.stories.js
 * @description Storybook configuration file for the link Columns component.
 * @module linkColumns.stories
 */

import { IconLink } from "./iconLink.js";
import defaultdata from "./iconLink.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Icon Link",

  render: (args) => new IconLink(args).html,
  //   args: defaultdata,
  argTypes: {
    url: {
      description: "The URL that the link points to",
      control: { control: "text" },
    },
    id: { control: "text" },
    label: {
      description: "The text that appears for the link",
      control: { control: "text" },
    },
    iconClass: {
      description: "The icon class for the link icon",
      control: { control: "text" },
    },
    iconPosition: {
      description:
        "The position of the icon relative to the link text. Options are 'leading' or 'trailing'",
      control: { control: "select" },
      options: ["leading", "trailing"],
      defaultValue: "leading",
    },
    target: {
      description:
        "The target attribute for the link (e.g., '_self', '_blank')",
      control: "select",
      options: ["_self", "_blank"],
      defaultValue: "_self",
    },
    arialabel: {
      description: "The aria-label attribute for the link (for screen readers)",
      control: { control: "text" },
    },
  },

  /**
   * Additional parameters for the story.
   *
   * @type {Object}
   * @property {Object} design - Configuration for the design parameter.
   * @property {string} design.name - Name of the design parameter.
   * @property {string} design.type - Type of the design parameter.
   * @property {string} design.url - URL of the design parameter.
   */
  parameters: {
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/design/2hnawnMhbVAHbYj91Z3S0I/00.-QLD.GOV-extended-components-and-templates?node-id=7402-2844&m=dev",
    },
    pageLayout: "with-wrapper",
    wrapperClasses: "qld-content-body",
  },
};

/**
 * Default Link story With Default Data
 */
export const Default = {
  args: {
    ...defaultdata.default,
  },
};

/**
 * Link in 'Dark' colour theme.
 */
export const Dark = {
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-dark-background)" }],
    },
  },
  args: {
    ...defaultdata.default,
    class: "dark",
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * List of links.
 */
export const LinkGroup = {
  args: {
    ...defaultdata.linkGroup,
  },
};

/**
 * Link without icon.
 */
export const WithoutIcon = {
  args: {
    ...defaultdata.default,
    iconClass: null,
    iconPosition: null,
  },
};
