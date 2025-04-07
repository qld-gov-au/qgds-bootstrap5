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
    argTypes: {
      type: {
          description: 'The types of layouts that this component supports',
          control: "select",
          options: ["promo", "contained", "indent-text", "indent-img"],
      },
      variantClass: {
        description: 'The types of themes that this component supports',
        control: "select",
        options: ["light", "alt", "dark", "dark-alt"],
      },  
      promoImage: {
        control: "text",
        description: "The image to be displayed in the promotional panel.",
        defaultValue:"./assets/img/banner-example-3-to-2.jpg",
      },
      contentAlignment: {
        description: 'Position of the content in the panel within this component',
        control: "select",
        options: ["content-left","content-right"],
      },
      icon: {
        control: "select",
        description: "Current list of usable icons available in the icon component.",
        options: ["icon-dot-grid", "icon-phone", "icon-email", "icon-search"],
      },
      title: {
        control: "text",
        description: "The title of the promotional panel.",
        defaultValue: "Title goes here and has a maximum of 65 character limit",
      },
      abstract: {
        control: "text",
        description: "The abstract of the promotional panel.",
        defaultValue:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tortor, leo vulputate ut odio mattis.",
      },
      body: {
        control: "text",
        description: "The body of the promotional panel.",
        defaultValue:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tortor, leo vulputate ut odio mattis. Vel suspendisse mi quisque consequat aliquet egestas.",
      },
      cta: {
          description: 'The call to action objects for the promotional panel.',
          control: 'object'
      },
      btn: {
        description: 'The button objects for the promotional panel.',
        control: 'object'
      }
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
       url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=23167-395563&t=RyMlGjeuzgl8p5Gx-0",
    },
  },
};

/**
 * Default Promotion Panel story
 */

export const Default = {
    args: {
        ...defaultdata
    },
};

export const Light = {
    args: {
        ...defaultdata,
        variantClass: "light",
    },
};

export const Alternative = {
    args: {
        ...defaultdata,
        variantClass: "alt",
    },
};

export const Dark = {
    args: {
        ...defaultdata,
        variantClass: "dark",
    },
};

export const DarkAlternative = {
    args: {
        ...defaultdata,
        variantClass: "dark-alt",
    },
};

