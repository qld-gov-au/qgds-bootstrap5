/**
 * @file callToAction.stories.js
 * @description Storybook configuration file for the CallToAction component.
 * @module callToAction.stories
 */

import { CallToAction } from "./callToAction.js";
import defaultdata from "./callToAction.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/CallToAction",
  args: defaultdata,
  render: (args) => {
    return `
    <div class="container">
      <div class="row">
        <div class="col">
          ${new CallToAction({ ...args }).html}
        </div>
        <div class="col">
          ${new CallToAction({ ...args, label: "Label", class: [{ small: false }, { "view-all": false }] }).html}
        </div>
      </div>
    </div>
    `;
  },
  parameters: {
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=11056-321367&p=f&t=v3sxViBgYUUmwplL-0",
    },
    backgrounds: { disable: false },
  },
  globals: { backgrounds: { value: "default" } },
};

/**
 * Call To Action - Default
 */
export const Default = {
  args: defaultdata,
  globals: { backgrounds: { value: "default" } },
  decorators: [
    (Story) => {
      return `
      <div class="default">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Call To Action - Light
 * */
export const Light = {
  globals: { backgrounds: { value: "light" } },
  decorators: [
    (Story) => {
      return `
      <div class="light">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Call To Action - Light-Alt
 * */
export const LightAlt = {
  globals: { backgrounds: { value: "alt" } },
  decorators: [
    (Story) => {
      return `
      <div class="light-alt">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Call To Action - Dark
 * */
export const Dark = {
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
 * Call To Action - Dark-Alt
 * */
export const DarkAlt = {
  globals: { backgrounds: { value: "darkAlt" } },
  decorators: [
    (Story) => {
      return `
      <div class="dark-alt">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Call To Action - Small
 * */
export const Small = {
  args: {
    ...defaultdata,
    label: "View all",
    class: [{ small: true }, { "view-all": true }],
  },
  render: (args) => {
    return `
    <div class="container">
      <div class="row">
        <div class="col">
          ${new CallToAction({ ...args }).html}
        </div>
        <div class="col">
          ${new CallToAction({ ...args, label: "Label", class: [{ small: true }, { "view-all": false }] }).html}
        </div>
      </div>
    </div>
    `;
  },
  globals: { backgrounds: { value: "darkAlt" } },
  decorators: [
    (Story) => {
      return `
      <div class="dark-alt">
          ${Story()}
      </div>
      `;
    },
  ],
};
