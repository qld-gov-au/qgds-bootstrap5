// ComponentExample.stories.js
import { Textarea, argTypes } from "./Textarea.js";
import defaultdata from "./textarea.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Forms/Text Area",
  render: (args) => {
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc.
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.

    if (typeof args.customClass === "string") {
      args.customClass = args.customClass.replaceAll(",", " ");
    } else if (typeof args.customClass === "object") {
      args.customClass = args.customClass.join(" ");
    }

    return new Textarea(args).html;
  },
  parameters: { backgrounds: { disable: false } },
  globals: { backgrounds: { value: "default" } },
  //https://storybook.js.org/docs/api/arg-types
  argTypes,
};

/**
 * Default palette
 */
export const Default = {
  args: defaultdata,
};

/**
 * Dark palette
 */
export const Dark = {
  args: {
    ...defaultdata,
    isDisabled: false,
  },
  globals: { backgrounds: { value: "dark" } },
  render: (args) => `<div class="dark">${new Textarea(args).html}</div>`,
};

/**
 * Add  `customClass: "form-style-filled"`
 */
export const Filled = {
  args: {
    ...defaultdata,
    customClass: "form-style-filled",
  },
};

export const Disabled = {
  args: {
    ...defaultdata,
    isDisabled: true,
    isRequired: false,
  },
};

export const Valid = {
  args: {
    ...defaultdata,
    isValid: true,
  },
};

export const Invalid = {
  args: {
    ...defaultdata,
    isValid: false,
  },
};
