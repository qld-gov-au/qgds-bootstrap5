// ComponentExample.stories.js
import { Textbox, argTypes } from "./Textbox.js";
import defaultdata from "./textbox.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Forms/Textbox",
  render: (args) => {
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc.
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.

    if (typeof args.customClass === "string") {
      args.customClass = args.customClass.replaceAll(",", " ");
    } else if (typeof args.customClass === "object") {
      args.customClass = args.customClass.join(" ");
    }

    return new Textbox(args).html;
  },

  parameters: { backgrounds: { disable: false } },

  //https://storybook.js.org/docs/api/arg-types
  argTypes,
};

/**
 * Default textbox
 */
export const Default = {
  args: defaultdata,
};

/**
 * Dark themed textbox
 */
export const Dark = {
  args: {
    ...defaultdata,
    ...{ isDisabled: false },
  },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-brand-primary)" }],
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

/**
 * Filled style textbox
 */
export const Filled = {
  args: {
    ...defaultdata,
    ...{ customClass: "form-style-filled" },
  },
};

/**
 * Disabled textbox
 */
export const Disabled = {
  args: {
    ...defaultdata,
    ...{ isDisabled: true },
  },
};

/**
 * Valid textbox
 */
export const Valid = {
  args: {
    ...defaultdata,
    ...{ customClass: "qld-input-success" },
  },
};

/**
 * Invalid textbox
 */
export const Invalid = {
  args: {
    ...defaultdata,
    ...{ customClass: "qld-input-error" },
  },
};
