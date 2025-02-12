/**
 * @file bactToTop.stories.js
 * @description Storybook configuration file for the BackToTop component.
 * @module backToTop.stories
 */

import { BackToTop } from './BackToTop.js';
import defaultdata from './backToTop.data.json';

export default {
  tags: ["autodocs"],
  title: "3. Components/Widgets (Back to Top)",
  render: (args) => new BackToTop(args).html,
  args: defaultdata,
  argTypes: {
    hide_back_to_top: { 
      control: 'boolean', 
    },
    has_icon: { 
      control: 'boolean',
    },
    min_page_height: { 
      name: "Minimum Page Height",
      description: 'Sets the minimum page height before the back to top button is displayed. This might be tricky to observe, as you will need to set the pages height using CSS to see the effect.',
      control: { 
        type: 'range', 
        min: 0,
        max: 4,
        step: 1,
      }, 
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
      url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=23167-395564&t=VORt8BOjhLPGSoci-0",
    },
  },
};

/**
 * Default backToTop story
 */
export const Default = {};
