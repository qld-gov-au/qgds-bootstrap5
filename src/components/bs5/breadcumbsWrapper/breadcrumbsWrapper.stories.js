import { forGov } from "../breadcrumbs/breadcrumbs.data.json";
import { BreadcrumbsWrapperTest } from "./breadcrumbsWrapper.test.js";
// eslint-disable-next-line no-unused-vars
import init from "../../../js/handlebars.init.js"; //self init's when loaded

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

