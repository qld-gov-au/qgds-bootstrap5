import defaultdata from "./head.data.json";
import { Head } from "./Head.js";

export default {
  tags: ["autodocs"],
  title: "!Core/HeadMeta",
  render: (args) => {
    return new Head(args).html;
  },

  argTypes: {
    cdn: {
      name: "CDN",
      description: `CDN prefix or provided text`,
      control: { type: 'radio' ,
        labels: { 'DEV': 'DEV', 'TEST' : 'TEST','BETA':'BETA','STAGING':'STAGING','PROD':'PROD','/__data/assets/git_bridge/0026/471752': 'SQUIZ Custom'},
      },
      options: [
        "DEV",
        "TEST",
        "BETA",
        "STAGING",
        "PROD",
        "/__data/assets/git_bridge/0026/471752",
      ],
    }
  },

  parameters: {
    docs: {
      controls: {

      },
    },
  },
};

/**
 * Default head metadata
 * 
 */
export const Default = {
  args: defaultdata,
  decorators: [
    (Story) => {
      return `
          ${Story()}
      `;
    },
  ],
};


export const DEV = {
  args: {
    cdn: "DEV"
  },
  decorators:[Story => {
    return `
          ${Story()}
      `;
  }]
};

export const SQUIZ = {
  args: {
    cdn: "/__data/assets/git_bridge/0026/471752"
  },
  decorators:[Story => {
    return `
          ${Story()}
      `;
  }]
};


