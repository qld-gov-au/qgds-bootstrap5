import { forGov } from "../breadcrumbs/breadcrumbs.data.json";
import { BreadcrumbsWrapperTest } from "./breadcrumbsWrapper.test.js";
const defaultData = { breadcrumbs: forGov };

export default {
  title: "!Layout/Components/Breadcrumbs Wrapper",
  render: (args) => {
    return new BreadcrumbsWrapperTest(args).html;
  },
  args: defaultData,
  argTypes: {
  },
  parameters: {
    docs: {
      controls: {

      },
    },
  },
  decorators: [
    (Story) => {
      return `
          ${Story()}
      `;
    },
  ],
};

/**
 * Default head metadata
 * 
 */
export const Default = {};

