// ComponentExample.stories.js
/**
 * @file linkColumns.stories.js
 * @description Storybook configuration file for the link Columns component.
 * @module linkColumns.stories
 */

import { LinkColumns } from "./linkColumns.js";
import defaultdata from "./linkColumns.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Link Columns",
  
  render: (args) => new LinkColumns(args).html,
  args: defaultdata,

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
       url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=23167-395563&t=RyMlGjeuzgl8p5Gx-0",
    },
  },
};

/**
 * Default Link Columns story
 */
export const Default = {};

export const Light = {
    args: {
        ...defaultdata,
        theme: "light",
    },
};

export const Alternative = {
    args: {
        ...defaultdata,
        theme: "alt",
    },
};

export const Dark = {
    args: {
        ...defaultdata,
        theme: "dark",
    },
};

export const DarkAlternative = {
    args: {
        ...defaultdata,
        theme: "dark-alt",
    },
};