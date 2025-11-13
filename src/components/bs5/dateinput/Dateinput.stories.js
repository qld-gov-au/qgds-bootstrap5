import { Dateinput } from "./Dateinput.js";
import defaultdata from "./dateinput.data.json";

/**
 * @import { Meta, StoryObject} from "@storybook/html";
 */

/** @type {Meta} */
export default {
  tags: ["autodocs"],
  title: "3. Components/Forms/Dateinput",
  render: (args) => {
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc.
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.

    if (typeof args.customClass === "string") {
      args.customClass = args.customClass.replaceAll(",", " ");
    } else if (typeof args.customClass === "object") {
      args.customClass = args.customClass.join(" ");
    }

    return new Dateinput(args).html;
  },
  argTypes: {},
  globals: { backgrounds: { value: "default" } },
  parameters: {
    docs: { story: { inline: false, height: "220px" } }, // inline:false to run in iframe so each story gets its own DOMContentLoaded event.
    backgrounds: { disable: false },
  },
};

/**
 * Default Date inputs
 */
export const Default = {
  args: defaultdata,
  globals: { backgrounds: { value: "default" } },
};

/**
 * Dark themed Date inputs
 */
export const Dark = {
  args: {
    ...defaultdata,
    ...{ isDisabled: false },
  },
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
 * Filled style Date inputs
 */
export const Filled = {
  args: {
    ...defaultdata,
    ...{ customClass: "form-style-filled" },
  },
};

/**
 * Disabled Date inputs
 */
export const Disabled = {
  args: {
    ...defaultdata,
    ...{ isDisabled: true },
  },
};

/**
 * Valid Date inputs
 */
export const Valid = {
  args: {
    ...defaultdata,
    ...{ customClass: "qld-input-success" },
  },
};

/**
 * Invalid Date inputs
 */
export const Invalid = {
  args: {
    ...defaultdata,
    ...{ customClass: "qld-input-error" },
  },
};
