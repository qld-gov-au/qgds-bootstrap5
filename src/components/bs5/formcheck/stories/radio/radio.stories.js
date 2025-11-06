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

export const RadioDark = {
  args: { ...defaultdata },
  globals: { backgrounds: { value: "dark" } },
  render: (args) => `<div class="dark">${new Formcheck(args).html}</div>`,
};

export const RadioSmall = {
  args: { ...defaultdata, id: "checkboxSmall" },
  render: (args) => `<div class="small">${new Formcheck(args).html}</div>`,
};

export const RadioSmallDark = {
  args: { ...defaultdata, id: "checkboxSmallDark" },
  globals: { backgrounds: { value: "dark" } },
  render: (args) => `<div class="dark small">${new Formcheck(args).html}</div>`,
};

export const RadioValid = {
  args: { ...defaultdata, id: "checkboxValid" },
  render: (args) => `${new Formcheck({ ...args, isValid: true }).html}`,
};

export const RadioValidSmall = {
  args: { ...defaultdata, id: "checkboxValidSmall" },
  render: (args) =>
    `<div class="small">${new Formcheck({ ...args, isValid: true }).html}</div>`,
};

export const RadioValidDark = {
  args: { ...defaultdata, id: "checkboxValidDark" },
  render: (args) =>
    `<div class="dark">${new Formcheck({ ...args, isValid: true }).html}</div>`,
  globals: { backgrounds: { value: "dark" } },
};

export const RadioValidSmallDark = {
  args: { ...defaultdata, id: "checkboxValidSmallDark" },
  render: (args) =>
    `<div class="dark small">${new Formcheck({ ...args, isValid: true }).html}</div>`,
  globals: { backgrounds: { value: "dark" } },
};

export const RadioInvalid = {
  args: { ...defaultdata, id: "checkboxInvalid" },
  render: (args) => `${new Formcheck({ ...args, isValid: false }).html}`,
};

export const RadioInvalidSmall = {
  args: { ...defaultdata, id: "checkboxInvalidSmall" },
  render: (args) =>
    `<div class="small">${new Formcheck({ ...args, isValid: false }).html}</div>`,
};

export const RadioInvalidDark = {
  args: { ...defaultdata, id: "checkboxInvalidDark" },
  render: (args) =>
    `<div class="dark">${new Formcheck({ ...args, isValid: false }).html}</div>`,
  globals: { backgrounds: { value: "dark" } },
};

export const RadioInvalidSmallDark = {
  args: { ...defaultdata, id: "checkboxInvalidSmallDark" },
  render: (args) =>
    `<div class="dark small">${new Formcheck({ ...args, isValid: false }).html}</div>`,
  globals: { backgrounds: { value: "dark" } },
};
