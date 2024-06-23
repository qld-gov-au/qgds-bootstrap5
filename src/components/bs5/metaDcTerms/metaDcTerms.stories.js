import MetaDcTermsData from "./MetaDcTerms.data.json";
import { MetaDcTerms } from "./MetaDcTerms.js";

const defaultData = {
  ...MetaDcTermsData,
  uri: "https://forgov.qld.gov.au/projects-and-initiatives/search-for-projects-and-initiatives",
  description: "description goes here",
  title: "this is my title",
}

export default {
  tags: ["autodocs"],
  title: "!Core/Head/Meta Dublin Core Terms (DCTERMS)",
  args: defaultData,
  render: (args) => {
    return new MetaDcTerms(args).html;
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
export const Default = {};



