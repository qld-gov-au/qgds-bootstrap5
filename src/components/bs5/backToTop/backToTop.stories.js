/**
 * @file backToTop.stories.js
 * @description Storybook configuration file for the BackToTop component.
 * @module backToTop.stories
 */

import { BackToTop } from "./backToTop.js";
import defaultdata from "./backToTop.data.json";
import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Back to Top",
  render: (args) => new BackToTop(args).html,
  args: defaultdata,

  parameters: {
    coderefs: {
      metadata,
      partialname: "backToTop", //{{> back-to-top }}
      tabs: {
        notes:
          "\n\nThe Back to Top is nested within the Content Footer pattern. It requires additonal markup (containers and utility classes) for correct layout within a page",
      },
    },
    docs: {},
  },
};

/**
 * Default backToTop story
 */
export const Default = {};
