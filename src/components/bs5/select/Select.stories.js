// ComponentExample.stories.js
import { Select, argTypes } from "./Select.js";
import defaultdata from "./select.data.json";
import optionGroupsData from "./select.optiongroups.data.json";
import metadata from "./metadata.json";

/**
 * Select provides a means to select a single item from a collapsible list.
 * Use of select helps to reduce input errors and screen space.
 *
 * Use the `options` parameter to define an Array of options. An option object supports all standard attributes of the [HTML Option element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option#attributes)
 * - label
 * - value
 * - selected
 * - disabled
 */
export default {
  tags: ["autodocs"],
  title: "3. Components/Forms/Select",
  render: (args) => {
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc.
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.

    if (typeof args.customClass === "string") {
      args.customClass = args.customClass.replaceAll(",", " ");
    } else if (typeof args.customClass === "object") {
      args.customClass = args.customClass.join(" ");
    }

    return new Select(args).html;
  },
  parameters: {
    coderefs: {
      metadata,
      partialname: "select", //{{> select }}
    },
    backgrounds: { disable: false },
  },
  globals: { backgrounds: { value: "default" } },

  //https://storybook.js.org/docs/api/arg-types
  argTypes,
};

/**
 * Default palette context
 */
export const Default = {
  args: defaultdata,
};

/**
 * Dark pallete context
 */
export const Dark = {
  args: {
    ...defaultdata,
    isDisabled: false,
  },
  globals: { backgrounds: { value: "dark" } },
  render: (args) => `<div class="dark">${new Select(args).html}</div>`,
};

/**
 * Add custom class `form-style-filled`
 */
export const Filled = {
  args: {
    ...defaultdata,
    isFilled: "true",
  },
};

export const Disabled = {
  args: {
    ...defaultdata,
    isDisabled: true,
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

/**
 * Select options may be defined within an `optionGroups` array.
 * An optionGroup is an object which contains a `groupLabel` and `options`.
 * It is possible to use both `optionGroups` and ungrouped `options` in a single config - option groups will be rendered above ungrouped options.
 */
export const OptionGroups = {
  args: optionGroupsData,
  parameters: {
    chromatic: {
      disableSnapshots: true,
    },
  },
};
