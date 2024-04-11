/**
 * @file Alert.stories.js
 * @description Storybook configuration file for the Alert component.
 * @module Alert.stories
 */

import { Alert } from "./Alert.js";
import exampleData from "./alert.data.json";

/**
 * The Alert component is also known as Page Alert.
 */

export default {
  /**
   * Automatically create documentation (overview) page.
   *
   * @type {string[]}
   */
  tags: ["autodocs"],

  /**
   * Name of the story.
   *
   * @type {string}
   */
  title: "Components/Alert",

  /**
   * Function that renders the HTML snippet for the story.
   *
   * @type {Function}
   * @param {Object} args - Arguments for rendering the story, including data for the Handlebars template placeholders.
   * @returns {string} - The rendered HTML snippet.
   */
  render: (args) => {
    return new Alert({ ...exampleData.success, ...args }).html;
  },

  /**
   * Arguments (props) to configure the story UI.
   * Options: https://storybook.js.org/docs/api/arg-types
   */
  argTypes: {
    classes: {
      controls: false,
      table: {
        disable: true,
      },
    },
    heading: {
      name: "Heading",
      defaultValue: "Default heading",
    },
    content: {
      name: "Content",
    },
    dismiss: {
      name: "Dismissable",
      control: {
        type: "boolean",
      },
      defaultValue: "Default dismiss content",
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
    // PENDING STORYBOOK 8 DESIGN ADDON UPDATE 4/4/24. SP.
    // design: {
    //   name: "QGDS Figma Reference",
    //   type: "figma",
    //   url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=5990-98125&mode=design&t=qwjFV2DLRYNST9Sr-0",
    // },
  },
};

/**
 * Use class <code>.alert-success</code>.
 */

export const Success = {
  args: {
    //Handlebars {{ placeholder }} replacements
    heading: "Your order has been completed",
    content:
      "Your order number is A-1234567890. A receipt has been sent to your email address.",
  },
};

/**
 * Use class <code>.alert-info</code>.
 */

export const Info = {
  // Instead of passing an object per our Success alert, this example uses passes the exampleData object imported at the top of the module.
  args: exampleData.info,
};

/**
 * Use class <code>.alert-warning</code>.
 */

export const Warning = {
  // This example does not specify any arguments, so the default values from the exampleData object will be used.
  args: {
    ...exampleData.warning,
    ...{
      heading: "I am a warning",
      content: "My data is merged with the Alert.warning example data object ",
    },
  },
};

/**
 * Use class <code>.alert-danger</code>.
 */

export const Danger = {
  args: exampleData.danger,
};
