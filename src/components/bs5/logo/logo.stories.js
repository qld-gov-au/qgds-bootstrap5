// logo.stories.js
/**
 * @file logo.stories.js
 * @description Storybook configuration file for the Logo component.
 * @module logo.stories
 */

import { Logo } from "./Logo";
import data from "./logo.data.json";

import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Logo",

  render: (args) => new Logo(args).html,
  parameters: {
    /* Documentation configuration */
    coderefs: {
      metadata,
      partialname: "logo", //{{> logo }
    },
  },

  argTypes: {
    logo: {
      name: "Logo",
      description: "Type of logo to display.",
      control: "select",
      options: [
        "coa-landscape",
        "coa-landscape-2lines",
        "coa-delivering-for-qld",
      ],
    },
  },
};

/**
 * Queensland Government logo (2 lines)
 */
export const Default = {
  args: {
    ...data,
  },
};

/**
 * Queensland Government logo (2 lines)
 */
export const TwoLines = {
  args: {
    ...data,
    logo: "coa-landscape-2lines",
  },
};

/**
 * Delivering for Queensland
 */
export const DeliveringForQueensland = {
  args: {
    ...data,
    logo: "coa-delivering-for-qld",
  },
};
