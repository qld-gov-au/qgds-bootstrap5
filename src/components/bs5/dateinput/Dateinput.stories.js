import { Dateinput } from "./Dateinput.js";
import defaultdata from "./dateinput.data.json";
import { expect } from "storybook/test";

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
    backgrounds: { disable: false },
  },
};

/**
 * Default Date inputs
 */
export const Default = {
  tags: ["!autodocs"],
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

// export const InputValuesArePaddedWithLeadingZeroesOnBlur = {
//   tags: ["!autodocs"],
//   args: defaultdata,
//   play: async ({ canvas, userEvent }) => {
//     const dayInput = document.getElementById(`${defaultdata.id}-dayinput`);
//     const monthInput = document.getElementById(`${defaultdata.id}-monthinput`);
//     const yearInput = document.getElementById(`${defaultdata.id}-yearinput`);

//     await userEvent.type(dayInput, "4");
//     await userEvent.tab();
//     await userEvent.type(monthInput, "4");
//     await userEvent.tab();
//     await userEvent.type(yearInput, "42");
//     await userEvent.tab();

//     await expect(dayInput.value).toBe("04");
//     await expect(monthInput.value).toBe("04");
//     await expect(yearInput.value).toBe("0042");
//   },
// };

// export const OutOfRangeValuesAreCorrected = {
//   tags: ["!autodocs"],
//   args: {
//     ...defaultdata,
//     ...{ yearMin: "1000", yearMax: "2000" },
//   },
//   play: async ({ canvas, userEvent }) => {
//     const dayInput = document.getElementById(`${defaultdata.id}-dayinput`);
//     const monthInput = document.getElementById(`${defaultdata.id}-monthinput`);
//     const yearInput = document.getElementById(`${defaultdata.id}-yearinput`);

//     await userEvent.type(dayInput, "42");
//     await userEvent.type(monthInput, "42");
//     await userEvent.type(yearInput, "42");
//     await userEvent.tab();

//     await expect(dayInput.value).toBe("31");
//     await expect(monthInput.value).toBe("12");
//     await expect(yearInput.value).toBe("1000");
//   },
// };
