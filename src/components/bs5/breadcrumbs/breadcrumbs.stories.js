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
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=5990-98076&mode=design&t=Ge7frKNP4uEGswUz-0",
    },
  },
};

/**
 * Default Breadcrumbs story
 * */
export const Default = {};

/**
 * Dark Breadcrumbs story
 * */
export const Dark = {
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-dark-background)" }],
    },
  },

  args: {
    ...defaultdata.defaultLong,
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
  args: defaultdata.forGov,
};

/**
 * Breadcrumbs with expander (Dark)
 * */
export const WithExpanderDark = {
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-dark-background)" }],
    },
  },
  args: {
    ...defaultdata.forGov,
    class: "dark",
  },
};
