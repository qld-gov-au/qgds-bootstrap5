import defaultdata from "./contentFooter.data.json";
import { ContentFooter } from "./contentFooter.js";

export default {
  title: "!Layout/Components/Content Footer",
  render: (args) => {
    return new ContentFooter(args).html;
  },

  argTypes: {
    lastUpdated: {
      name: "Last updated",
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
 * Default Content Footer
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

/**
 * Default empty Content Footer
 *
 */
export const DefaultEmpty = {
  args: {
  },
  decorators:[Story => {
    return `
          ${Story()}
      `;
  }],
};


