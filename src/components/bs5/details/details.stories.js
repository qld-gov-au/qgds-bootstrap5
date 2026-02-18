/**
 * @file details.stories.js
 * @description Storybook configuration file for the Details component.
 * @module details.stories
 */

import { Details } from "./Details.js";
import defaultdata from "./details.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Details",
  render: (args) => new Details(args).html,
  args: defaultdata,
  globals: {
    backgrounds: { value: "default" },
  },
  parameters: {
    backgrounds: {
      disable: false,
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
    (Story) => `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="light">
          ${Story()}
      </div>
      </div></div></div>
    `,
  ],
};

/**
 * Details in 'Alternative' colour theme.
 */
export const Alternative = {
  args: { ...defaultdata },
  globals: { backgrounds: { value: "alt" } },
  decorators: [
    (Story) => `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="alt">
          ${Story()}
      </div>
      </div></div></div>
    `,
  ],
};

/**
 * Details in 'Dark' colour theme.
 */
export const Dark = {
  args: { ...defaultdata },
  globals: { backgrounds: { value: "dark" } },
  decorators: [
    (Story) => `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="dark">
          ${Story()}
      </div>
      </div></div></div>
    `,
  ],
};

/**
 * Details in 'Dark alternative' colour theme.
 */
export const DarkAlternative = {
  args: { ...defaultdata },
  globals: { backgrounds: { value: "darkAlt" } },
  decorators: [
    (Story) => `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="dark-alt">
          ${Story()}
      </div>
      </div></div></div>
    `,
  ],
};
