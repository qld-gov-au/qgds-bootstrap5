// logo.stories.js
/**
 * @file logo.stories.js
 * @description Storybook configuration file for the Logo component.
 * @module logo.stories
 */

import { Logo } from "./Logo";
import data from "./logo.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Logo",

  render: (args) => new Logo(args).html,
  parameters: {
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97957&m=dev",
    },
  },
};

/**
 * Default Link Columns story With Default Data
 */
export const Default = {
  args: {
    ...data,
  },
};
