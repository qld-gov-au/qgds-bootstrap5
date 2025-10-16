/**
 * @file accordion.stories.js
 * @description Storybook configuration file for the Accordion component.
 * @module accordion.stories
 */

import { Accordion } from "./Accordion.js";
import defaultdata from "./accordion.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Accordion",
  render: (args) => new Accordion(args).html,
  args: defaultdata,
  argTypes: {
    headingTag: {
      name: "Heading Tag",
      description: "Heading tag. Can be h2, h3, h4, h5 or h6.",
      control: "select",
      options: ["h2", "h3", "h4", "h5", "h6"],
    },
  },
  globals: {
    backgrounds: { value: "default" },
  },

  /**
   * Additional parameters for the story.
   *
   * @type {Object}
   * @property {Object} design - Configuration for the design parameter.
   * @property {string} design.name - Name of the design parameter.
   * @property {string} design.type - Type of the design parameter.
   * @property {string} design.url - URL of the design parameter.
   */
  parameters: {
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=6276-45691&mode=design&t=crJKtPwMG2IcZf5E-4",
    },
    backgrounds: {
      disable: false,
    },
  },
};

/**
 * Default Accordion story
 */
export const Default = {
  globals: { backgrounds: { value: "default" } },
};

/**
 * Accordion in 'Light' colour theme.
 */
export const Light = {
  args: {
    ...defaultdata,
    groupid: "accordion-group-light",
    accordionItems: {
      0: { ...defaultdata.accordionItems[0], id: "light-one" },
      1: { ...defaultdata.accordionItems[1], id: "light-two" },
      2: { ...defaultdata.accordionItems[2], id: "light-three" },
    },
  },
  globals: {
    backgrounds: { value: "light" },
  },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="light">
          ${Story()}
      </div>
      </div></div></div>
      `;
    },
  ],
};

/**
 * Accordion in 'Alternative' colour theme.
 */
export const Alternative = {
  args: {
    ...defaultdata,
    groupid: "accordion-group-alt",
    accordionItems: {
      0: { ...defaultdata.accordionItems[0], id: "alt-one" },
      1: { ...defaultdata.accordionItems[1], id: "alt-two" },
      2: { ...defaultdata.accordionItems[2], id: "alt-three" },
    },
  },
  globals: {
    backgrounds: { value: "alt" },
  },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="alt">
          ${Story()}
      </div>
      </div></div></div>
      `;
    },
  ],
};

/**
 * Accordion in 'Dark' colour theme.
 */
export const Dark = {
  args: {
    ...defaultdata,
    groupid: "accordion-group-dark",
    accordionItems: {
      0: { ...defaultdata.accordionItems[0], id: "dark-one" },
      1: { ...defaultdata.accordionItems[1], id: "dark-two" },
      2: { ...defaultdata.accordionItems[2], id: "dark-three" },
    },
  },
  globals: {
    backgrounds: { value: "dark" },
  },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="dark">
          ${Story()}
      </div>
      </div></div></div>
      `;
    },
  ],
};

/**
 * Accordion in 'Dark alternative' colour theme.
 */
export const DarkAlternative = {
  args: {
    ...defaultdata,
    groupid: "accordion-group-dark-alt",
    accordionItems: {
      0: { ...defaultdata.accordionItems[0], id: "dark-alt-one" },
      1: { ...defaultdata.accordionItems[1], id: "dark-alt-two" },
      2: { ...defaultdata.accordionItems[2], id: "dark-alt-three" },
    },
  },
  globals: { backgrounds: { value: "darkAlt" } },

  decorators: [
    (Story) => {
      return `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="dark-alt">
          ${Story()}
      </div>
      </div></div></div>
      `;
    },
  ],
};
