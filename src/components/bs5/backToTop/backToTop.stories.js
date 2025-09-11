/**
 * @file bactToTop.stories.js
 * @description Storybook configuration file for the BackToTop component.
 * @module backToTop.stories
 */

import { BackToTop } from "./backToTop.js";
import defaultdata from "./backToTop.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Back to Top",
  render: (args) => new BackToTop(args).html,
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
      url: "https://www.figma.com/design/XPeQMu5zKhEPKXdtZclWIW/Back-to-top?node-id=2004-2461&m=dev",
    },
  },
};

/**
 * Default backToTop story
 */
export const Default = {};
