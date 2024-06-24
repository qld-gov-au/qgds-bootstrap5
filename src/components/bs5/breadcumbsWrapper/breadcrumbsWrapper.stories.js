import { forGov } from "../breadcrumbs/breadcrumbs.data.json";
import { BreadcrumbsWrapperTest } from "./breadcrumbsWrapper.test.js";
import init from "../../../js/handlebars.init.js";
import Handlebars from "handlebars";

const defaultData = { breadcrumbs: forGov };

export default {
  title: "!Layout/Components/Breadcrumbs Wrapper",
  render: (args) => {
    init(Handlebars)
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

