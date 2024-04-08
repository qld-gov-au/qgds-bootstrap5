/**
 * @file accordion.stories.js
 * @description Storybook configuration file for the Accordion component.
 * @module accordion.stories
 */

import { Accordion } from "./Accordion.js";
import defaultdata from "./accordion.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Accordion",
  render: (args) => new Accordion(args).html,
  args: defaultdata,

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
  },
};

/**
 * Default Accordion story
 */
export const Default = {};

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
  parameters: {
    themes: {
      themeOverride: 'Light', // component level override
    },
    backgrounds: {
      default: "Light",
      values: [{ name: "Light", value: "var(--qld-light-background)" }],
    },
  },
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
  parameters: {
    themes: {
      themeOverride: 'Light alternative', // component level override
    },
    backgrounds: {
      default: "Alternative",
      values: [{ name: "Alternative", value: "var(--qld-light-grey-alt)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="alt">
          ${Story()}
      </div>
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
  parameters: {
    themes: {
      themeOverride: 'Dark', // component level override
    },
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
  parameters: {
    backgrounds: {
      themes: {
        themeOverride: 'Dark alternative', // component level override
      },
      default: "Dark alternative",
      values: [{ name: "Dark alternative", value: "var(--qld-dark-blue)" }],
    },
  },
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
