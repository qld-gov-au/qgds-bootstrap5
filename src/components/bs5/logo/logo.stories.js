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

    docs: {
      componentMetadata: metadata,
      /* Code Tabs */
      codeReferences: [
        {
          label: "Handlebars",
          language: "handlebars",
          content: new Logo().template,
        },
        {
          label: "JSON",
          language: "json",
          content: data,
        },
        {
          label: "HTML",
          language: "html",
          content: new Logo(data).html,
        },
        {
          label: "Colour information",
          language: "text",
          content:
            "The following tokens are used on this component:\n\n" +
            "- `--qg-color-primary`\n" +
            "- `--qg-color-on-primary`\n" +
            "- `--qg-color-background`\n" +
            "- `--qg-color-on-background`\n",
        },
      ],
      howToUse: {
        show: true,
        customMarkdown: `## My title
Hello world
`,
      },
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
