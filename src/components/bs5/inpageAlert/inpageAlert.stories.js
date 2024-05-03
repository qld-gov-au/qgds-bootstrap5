import { InpageAlert } from "./InpageAlert.js";
import defaultdata from "./inpageAlert.data.json";

/**
 * The Inpage Alert is also known as Page Alert or Alert
 * 
 * Inpage alert accepts the following classes: <code>.alert-success</code>, <code>.alert-info</code>, <code>.alert-warning</code>, and <code>.alert-danger</code>
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
  title: "Components/In-page Alert",

  /**
   * Function that renders the HTML snippet for the story.
   *
   * @type {Function}
   * @param {Object} args - Arguments for rendering the story, including data for the Handlebars template placeholders.
   * @returns {string} - The rendered HTML snippet.
   */
  render: (args) => {
    return new InpageAlert({ ...defaultdata, ...args }).html;
  },

  argTypes: {
    variantClass: {
      name: "Classes",
      description: `Settable classes for the In-page Alert component`,
      control: {
        type: "radio",
        labels: {
          "alert-success": "Success",
          "alert-info": "Info",
          "alert-warning": "Warning",
          "alert-error": "Error",
        },
      },
      options: [
        "alert-success",
        "alert-info",
        "alert-warning",
        "alert-error",
      ],
    },
  },

};


/**
 * Default In-page Alert component.
 */

export const Default = {
  args: defaultdata,
};




/**
 * In-page Alert when presented inside a <code>.dark</code> or <code>.dark-alt</code> container.
 */


export const Dark = {
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        { name: 'Dark', value: 'var(--qld-dark-background)' },
      ],
    },
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
