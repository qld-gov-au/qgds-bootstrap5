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
  title: "3. Components/In-page Alert",

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
  globals: { backgrounds: { value: "default" } },
  parameters: { backgrounds: { disable: false } },
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
      options: ["alert-success", "alert-info", "alert-warning", "alert-error"],
    },
    alertType: {
      name: "Alert Type",
      description: `Type of the alert. i.g "Success", "Information", "Warning", "Error".`,
    },
    headingTag: {
      name: "Heading Tag",
      description:
        "Heading tag for the In-page Alert component. Can be h2, h3, h4, h5 or h6.",
      control: "select",
      options: ["h2", "h3", "h4", "h5", "h6"],
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
  globals: { backgrounds: { value: "dark" } },

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
 * All alert variants with proper accessibility using DOM-based icons.
 * Each alert includes a qld-icon span with aria-hidden and a visually-hidden span for screen readers.
 */
export const AllVariants = {
  name: "All Alert Types (Accessibility)",
  render: () => {
    const alerts = [
      {
        variantClass: "alert-success",
        alertType: "Success",
        heading: "Success Alert",
        content: "<p>This action was completed successfully.</p>",
      },
      {
        variantClass: "alert-info",
        alertType: "Information",
        heading: "Information Alert",
        content: "<p>Here is some important information for you to know.</p>",
      },
      {
        variantClass: "alert-warning",
        alertType: "Warning",
        heading: "Warning Alert",
        content: "<p>Please be aware of this potential issue.</p>",
      },
      {
        variantClass: "alert-error",
        alertType: "Error",
        heading: "Error Alert",
        content: "<p>An error occurred. Please try again.</p>",
      },
    ];

    return alerts
      .map(
        (alertData) => `
      <div class="mb-4">
        ${new InpageAlert(alertData).html}
      </div>
    `
      )
      .join("");
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};
