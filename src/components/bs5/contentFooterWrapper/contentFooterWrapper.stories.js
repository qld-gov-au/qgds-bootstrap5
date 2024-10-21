import defaultdata from "./../contentFooter/contentFooter.data.json";
import { ContentFooterWrapperTest } from "./contentFooterWrapper.test.js";

export default {
  title: "!Layout/Components/Content Footer Wrapper",
  render: (args) => {
    return new ContentFooterWrapperTest(args).html;
  },

  argTypes: {
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

