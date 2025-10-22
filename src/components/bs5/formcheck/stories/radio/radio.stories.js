// FormcheckRadio.stories.js
import { Formcheck, argTypes } from "../../Formcheck.js";
import defaultdata from "./radio.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Forms/Radio",
  render: (args) => {
    return `${new Formcheck(args).html}`;
  },
  globals: { backgrounds: { value: "default" } },
  parameters: { backgrounds: { disable: false } },
  //https://storybook.js.org/docs/api/arg-types
  argTypes,
};

export const Default = {
  args: { ...defaultdata },
  globals: { backgrounds: { value: "default" } },
};

export const CheckboxDark = {
  args: { ...defaultdata },
  globals: { backgrounds: { value: "dark" } },
  render: (args) => `<div class="dark">${new Formcheck(args).html}</div>`,
};

export const CheckboxSmall = {
  args: { ...defaultdata, id: "checkboxSmall" },
  render: (args) => `<div class="small">${new Formcheck(args).html}</div>`,
};

export const CheckboxSmallDark = {
  args: { ...defaultdata, id: "checkboxSmallDark" },
  globals: { backgrounds: { value: "dark" } },
  render: (args) => `<div class="dark small">${new Formcheck(args).html}</div>`,
};

export const CheckboxValid = {
  args: { ...defaultdata, id: "checkboxValid" },
  render: (args) => `${new Formcheck({ ...args, isValid: true }).html}`,
};

export const CheckboxValidSmall = {
  args: { ...defaultdata, id: "checkboxValidSmall" },
  render: (args) =>
    `<div class="small">${new Formcheck({ ...args, isValid: true }).html}</div>`,
};

export const CheckboxValidDark = {
  args: { ...defaultdata, id: "checkboxValidDark" },
  render: (args) =>
    `<div class="dark">${new Formcheck({ ...args, isValid: true }).html}</div>`,
  globals: { backgrounds: { value: "dark" } },
};

export const CheckboxValidSmallDark = {
  args: { ...defaultdata, id: "checkboxValidSmallDark" },
  render: (args) =>
    `<div class="dark small">${new Formcheck({ ...args, isValid: true }).html}</div>`,
  globals: { backgrounds: { value: "dark" } },
};

export const CheckboxInvalid = {
  args: { ...defaultdata, id: "checkboxInvalid" },
  render: (args) => `${new Formcheck({ ...args, isValid: false }).html}`,
};

export const CheckboxInvalidSmall = {
  args: { ...defaultdata, id: "checkboxInvalidSmall" },
  render: (args) =>
    `<div class="small">${new Formcheck({ ...args, isValid: false }).html}</div>`,
};

export const CheckboxInvalidDark = {
  args: { ...defaultdata, id: "checkboxInvalidDark" },
  render: (args) =>
    `<div class="dark">${new Formcheck({ ...args, isValid: false }).html}</div>`,
  globals: { backgrounds: { value: "dark" } },
};

export const CheckboxInvalidSmallDark = {
  args: { ...defaultdata, id: "checkboxInvalidSmallDark" },
  render: (args) =>
    `<div class="dark small">${new Formcheck({ ...args, isValid: false }).html}</div>`,
  globals: { backgrounds: { value: "dark" } },
};
