import defaultdata from "./contentFooter.data.json";
import { ContentFooter } from "./contentFooter.js";
import metadata from "./metadata.json";

export default {
  title: "3. Components/Content Footer",
  render: (args) => {
    return new ContentFooter(args).html;
  },

  argTypes: {
    lastUpdated: {
      name: "Last updated",
      description: `Date page was Last Updated`,
      control: { type: "text" },
    },
  },

  parameters: {
    coderefs: {
      metadata,
      partialname: "contentFooter", //{{> contentFooter }}
      tabs: {
        notes:
          "\n\nThis Content Footer pattern includes a Back To Top component. Configure Back To Top options via the contentFooter JSON data.",
      },
    },
    docs: {
      controls: {},
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
// export const DefaultEmpty = {
//   args: {},
//   parameters: {
//     chromatic: { disableSnapshot: true },
//   },
//   decorators: [
//     (Story) => {
//       return `
//           ${Story()}
//       `;
//     },
//   ],
// };
