import defaultdata from "./head.data.json";
import { Head } from "./Head.js";

export default {
  tags: ["autodocs"],
  title: "1. Core Styles/Head/Includes CDN or Local",
  render: (args) => {
    return new Head(args).html;
  },

  argTypes: {
    cdn: {
      name: "CDN",
      description: `CDN prefix or provided text`,
      control: {
        type: "radio",
        labels: {
          DEV: "DEV",
          TEST: "TEST",
          BETA: "BETA",
          STAGING: "STAGING",
          PROD: "PROD",
          "/__data/assets/git_bridge/0026/471752": "SQUIZ Custom",
        },
      },
      options: [
        "DEV",
        "TEST",
        "BETA",
        "STAGING",
        "PROD",
        "/__data/assets/git_bridge/0026/471752",
      ],
    },
  },

  parameters: {
    docs: {
      codeReferences: [
        {
          label: "HTML",
          language: "html",
          content: new Head(defaultdata).html,
        },
      ],
      howToUse: {
        show: false,
      },
    },
  },
};

/**
 * Default head metadata
 *
 */
export const Default = {
  tags: ["!dev"],
  args: defaultdata,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => {
      return `
          ${Story()}
      `;
    },
  ],
};

export const DEV = {
  tags: ["!dev"],
  args: {
    cdn: "DEV",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => {
      return `
          ${Story()}
      `;
    },
  ],
};

export const SQUIZ = {
  tags: ["!dev"],
  args: {
    cdn: "/__data/assets/git_bridge/0026/471752",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => {
      return `
          ${Story()}
      `;
    },
  ],
};
