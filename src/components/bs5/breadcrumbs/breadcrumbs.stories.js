//Breadcrumbs.stories.js
import { Breadcrumbs } from "./Breadcrumbs.js";
import defaultdata from "./breadcrumbs.data.json";

export default {
  tags: ["autodocs"],
  title: "2. Layout/Breadcrumbs",
  args: defaultdata.default,
  render: (args) => new Breadcrumbs(args).html,

  argTypes: {
    breadcrumbs: {
      name: "Breadcrumbs",
      control: "object",
      description: `Pass a JSON object containing an array of links to the component.`,
    },
  },
  globals: {
    backgrounds: {
      value: "default",
    },
  },
  decorators: [
    (Story, context) => {
      const { args } = context; // Deconstruct args from the context oject
      return `
      <div class="container-fluid ${args.class || ""}">
        <div class="row">
          <div class="col-12">
              <!-- Breadcrumbs Component -->
              ${Story(args)} <!-- Pass args to the Story -->
          </div>
        </div>
      </div>
      `;
    },
  ],

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
    coderefs: {
      partialname: "breadcrumbs", //{{> breadcrumbs }}
      tabs: {
        notes:
          "Breadcrumbs usually sit within a container that aligns with the main content. Refer to the Page Layout story for example usage.",
      },
    },
    backgrounds: {
      disable: false,
    },
  },
};

/**
 * Default Breadcrumbs story
 * */
export const Default = {
  globals: {
    backgrounds: {
      value: "default",
    },
  },
};

/**
 * Dark Breadcrumbs story
 * */
export const Dark = {
  globals: {
    backgrounds: {
      value: "dark",
    },
  },
  args: {
    ...defaultdata.default,
    class: "dark",
  },
  decorators: [
    (Story) => {
      return `
        <!-- Breadcrumb Component -->
        ${Story()}
      `;
    },
  ],
};

/**
 * Breadcrumbs with expander (Default)
 * */
export const WithExpanderDefault = {
  args: defaultdata.expanderSample,
};

/**
 * Breadcrumbs with expander (Dark)
 * */
export const WithExpanderDark = {
  globals: {
    backgrounds: {
      value: "dark",
    },
  },
  args: {
    ...defaultdata.expanderSample,
    class: "dark",
  },
};

/* export const LongBreadcrumbs = {
  args: defaultdata.defaultLong,
}; */

export const ForGov = {
  args: defaultdata.forGov,
};
