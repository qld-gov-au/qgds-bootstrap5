/**
 * @file accordion.stories.js
 * @description Storybook configuration file for the Accordion component.
 * @module accordion.stories
 */

import { Accordion } from "./Accordion.js";
import defaultdata from "./accordion.data.json";
import metadata from "./metadata.json";

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

  parameters: {
    coderefs: {
      metadata,
      partialname: "accordion", //{{> accordion }}
    },
    backgrounds: {
      disable: false,
    },
    docs: {},
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
 *
 */
export const Dark = {
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

/**
 * Accordion group nested inside an item in a parent accordion group.
 */
export const NestedAccordion = {
  args: {
    groupid: "parent-accordion-group",
    toggleAll: false,
    headingTag: "h2",
    accordionItems: [
      {
        id: "Parent-One",
        title: "Parent accordion item with nested accordion",
        expanded: true,
        content: "",
      },
      {
        id: "Parent-Two",
        title: "Parent accordion item",
        expanded: false,
        content: "<p>This content belongs to the parent accordion group.</p>",
      },
    ],
  },
  render: (args) => {
    const nestedAccordion = new Accordion({
      groupid: "nested-accordion-group",
      toggleAll: false,
      headingTag: "h3",
      accordionItems: [
        {
          id: "Nested-One",
          title: "Nested accordion item one",
          expanded: true,
          content: "<p>This content belongs to the nested accordion group.</p>",
        },
        {
          id: "Nested-Two",
          title: "Nested accordion item two",
          expanded: false,
          content:
            "<p>The nested accordion operates independently of its parent.</p>",
        },
      ],
    }).html;
    const defaultAccordion = new Accordion(defaultdata).html;

    const parentAccordion = new Accordion({
      ...args,
      accordionItems: args.accordionItems.map((item, index) =>
        index === 0
          ? {
              ...item,
              content: `<p>This parent item contains another accordion group.</p>${nestedAccordion}`,
            }
          : item,
      ),
    }).html;

    return `${parentAccordion}${defaultAccordion}`;
  },
  globals: { backgrounds: { value: "default" } },
};
