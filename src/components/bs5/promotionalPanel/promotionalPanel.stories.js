// ComponentExample.stories.js
/**
 * @file promotionalPanel.stories.js
 * @description Storybook configuration file for the Promotional Panel component.
 * @module promotionalPanel.stories
 */

import { PromotionalPanel } from "./promotionalPanel.js";
import defaultdata from "./promotionalPanel.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Promotional Panel",
  
  render: (args) => new PromotionalPanel(args).html,
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
export const Default = {
    args: {
        ...defaultdata
    },
};

