// FormcheckRadio.stories.js
import { Formcheck } from "../../Formcheck.js";
import defaultdata from "./radio.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Formcheck/Radio",
  render: (args) => {
    return `${new Formcheck(args).html}`;
  },
  //https://storybook.js.org/docs/api/arg-types
  argTypes: {},
};

// Default story for Formcheck component
export const Default = {
  args: { ...defaultdata },
  parameters: {
    controls: { include: `listitems` },
  },
};

export const RadioDark = {
  args: { ...defaultdata },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
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

export const RadioSmall = {
  args: { ...defaultdata, id: "radioSmall" },
  decorators: [
    (Story) => {
      return `
      <div class="small">
          ${Story()}
      </div>
      `;
    },
  ],
};

export const RadioSmallDark = {
  args: { ...defaultdata, id: "radioSmallDark" },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark"><div class="small">
          ${Story()}
      </div></div>
      `;
    },
  ],
};

export const RadioValid = {
  args: { ...defaultdata, id: "radioValid" },
  render: (args) => {
    return `
    <div class="valid">${new Formcheck(args).html}</div>
    `;
  },
};

export const RadioValidSmall = {
  args: { ...defaultdata, id: "radioValidSmall" },
  render: (args) => {
    return `
    <div class="small"><div class="valid">${new Formcheck(args).html}</div></div>
    `;
  },
};

export const RadioValidDark = {
  args: { ...defaultdata, id: "radioValidDark" },
  render: (args) => {
    return `
    <div class="dark">
    <div class="valid">${new Formcheck(args).html}</div></div>
    `;
  },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark"><div class="valid">
          ${Story()}
      </div></div>
      `;
    },
  ],
};

export const RadioValidSmallDark = {
  args: { ...defaultdata, id: "radioValidSmallDark" },
  render: (args) => {
    return `
    <div class="dark">
    <div class="valid">${new Formcheck(args).html}</div></div>
    `;
  },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark"><div class="small"><div class="valid">
          ${Story()}
      </div></div></div>
      `;
    },
  ],
};

export const RadioInvalid = {
  args: { ...defaultdata, id: "radioInvalid" },
  render: (args) => {
    return `
    <div class="invalid">${new Formcheck(args).html}</div>
    `;
  },
};

export const RadioInvalidSmall = {
  args: { ...defaultdata, id: "radioInvalidSmall" },
  render: (args) => {
    return `
    <div class="small"><div class="invalid">${new Formcheck(args).html}</div></div>
    `;
  },
};
export const RadioInvalidDark = {
  args: { ...defaultdata, id: "radioInvalidDark" },
  render: (args) => {
    return `
    <div class="invalid"><div class="dark">${new Formcheck(args).html}</div></div>
    `;
  },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
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

export const RadioInvalidSmallDark = {
  args: { ...defaultdata, id: "radioInvalidSmallDark" },
  render: (args) => {
    return `
    <div class="dark">
    <div class="invalid">${new Formcheck(args).html}</div></div>
    `;
  },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark"><div class="small"><div class="invalid">
          ${Story()}
      </div></div></div>
      `;
    },
  ],
};
