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
  render: (args) => new CallToAction(args).html,
  args: defaultdata,

  
  parameters: {
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=11056-321367&p=f&t=v3sxViBgYUUmwplL-0",
    },
  },
};

/**
 * Default Accordion story
 */
export const Default = {};
