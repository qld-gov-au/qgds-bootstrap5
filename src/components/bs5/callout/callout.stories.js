// callout.stories.js
import { Callout } from './Callout.js';
import defaultdata from './callout.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Callout',
  render: (args) => new Callout(args).html,

  argTypes: {
    title: {
      name: 'Title',
      description: `H3 title text for the callout.`,
    },
    content: {
      name: 'Content',
      description: 'Text content for the callout. Can include HTML markup.',
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
      url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=5990-98115&mode=design&t=Ue7c77KjVYU1eTGj-0",
    },
  },
};

/**
 * Default Callout
 */
export const Default = {
  args: defaultdata.default,
};

/**
 * Callout without title
 */
export const NoTitle = {
  args: defaultdata.noTitle,
};
