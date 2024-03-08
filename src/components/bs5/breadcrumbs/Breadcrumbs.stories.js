// Blockquote.stories.js
import { Breadcrumbs } from './Breadcrumbs.js';
import defaultdata from './breadcrumbs.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Breadcrumbs',
  render: (args) => new Breadcrumbs(args).html,

  argTypes: {
    breadcrumbs: {
      name: 'Breadcrumbs',
      control: 'object',
      description: `Pass a JSON object containing an array of links to the component.`,
    },
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
      url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=5990-98076&mode=design&t=Ge7frKNP4uEGswUz-0",
    },
  },
};

/**
 * Default Breadcrumbs story
 * */
export const Default = {
  args: defaultdata.default,
};

/**
 * Default Breadcrumbs story
 * */
export const forGov = {
  args: defaultdata.forGov,
};
