// modal.stories.js
import { PromotionalPanel } from './promotionalPanel.js';
import defaultdata from './promotionalPanel.data.json';

export default {
    tags: ["autodocs"],
    title: "3. Components/Promotional Panel",
    render: (args) => new PromotionalPanel(args).html,
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
    // parameters: {
    //   design: {
    //     name: "QGDS Figma Reference",
    //     type: "figma",
    //     url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=6276-45691&mode=design&t=crJKtPwMG2IcZf5E-4",
    //   },
    // },
  };
  
  /**
   * Default Accordion story
   */
  export const Default = {};