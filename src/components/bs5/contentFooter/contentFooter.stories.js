import defaultdata from "./contentFooter.data.json";
import { ContentFooter } from "./contentFooter.js";
import init from "../../../js/handlebars.init.js";
import Handlebars from "handlebars";

export default {
  title: "!Layout/Components/Content Footer",
  render: (args) => {
    init(Handlebars)
    return new ContentFooter(args).html;
  },

  argTypes: {
    lastUpdated: {
      name: "Last Updated",
      description: `Date page was Last Updated`,
      control: { type: 'text'  },
    },
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
    cdn: "DEV",
  },
  decorators:[Story => {
    return `
          ${Story()}
      `;
  }],
};

export const SQUIZ = {
  args: {
    cdn: "/__data/assets/git_bridge/0026/471752",
  },
  decorators:[Story => {
    return `
          ${Story()}
      `;
  }],
};


