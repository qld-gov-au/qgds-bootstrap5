/**
 * @file details.stories.js
 * @description Storybook configuration file for the Details component.
 * @module details.stories
 */

import { Details } from "./Details.js";
import defaultdata from "./details.data.json";
import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Details",
  render: (args) => new Details(args).html,
  args: { ...defaultdata, size: "md" },
  globals: {
    backgrounds: { value: "default" },
  },
  parameters: {
    coderefs: {
      metadata,
      partialname: "details", //{{> details }}
    },
    backgrounds: {
      disable: false,
    },
    docs: {},
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "Size of the details component (xs=32px, sm=36px, md=40px, lg=44px)",
      defaultValue: "md",
    },
  },
};

/**
 * Default Details story (collapsed)
 */
export const Default = {
  globals: { backgrounds: { value: "default" } },
};

/**
 * Details in open/expanded state
 */
export const Open = {
  args: {
    ...defaultdata,
    open: true,
  },
  globals: { backgrounds: { value: "default" } },
};

/**
 * Details in 'Light' colour theme.
 */
export const Light = {
  args: { ...defaultdata },
  globals: { backgrounds: { value: "light" } },
  decorators: [
    (Story) => `<div class="container-fluid light">${Story()}</div>`,
  ],
};

/**
 * Details in 'Alternative' colour theme.
 */
export const Alternative = {
  args: { ...defaultdata },
  globals: { backgrounds: { value: "alt" } },
  decorators: [
    (Story) => `<div class="container-fluid alt">${Story()}</div>`,
  ],
};

/**
 * Details in 'Dark' colour theme.
 */
export const Dark = {
  args: { ...defaultdata },
  globals: { backgrounds: { value: "dark" } },
  decorators: [
    (Story) => `<div class="container-fluid dark">${Story()}</div>`,
  ],
};

/**
 * Details in 'Dark alternative' colour theme.
 */
export const DarkAlternative = {
  args: { ...defaultdata },
  globals: { backgrounds: { value: "darkAlt" } },
  decorators: [
    (Story) => `<div class="container-fluid dark-alt">${Story()}</div>`,
  ],
};
