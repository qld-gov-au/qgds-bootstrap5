import MetaDcTermsData from "./MetaDcTerms.data.json";
import { MetaDcTerms } from "./MetaDcTerms.js";

const defaultData = {
  ...MetaDcTermsData,
  uri: "https://forgov.qld.gov.au/projects-and-initiatives/search-for-projects-and-initiatives",
  description: "description goes here",
  title: "this is my title",
};

export default {
  tags: ["autodocs"],
  title: "1. Core Styles/Head/Meta Dublin Core Terms (DCTERMS)",
  args: defaultData,
  render: (args) => {
    return new MetaDcTerms(args).html;
  },

  argTypes: {},

  parameters: {
    docs: {
      controls: {},
      codeReferences: [
        {
          label: "HTML",
          language: "html",
          content: new MetaDcTerms(defaultData).html,
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
  parameters: {
    // Disables Chromatic's snapshotting on a component level
    chromatic: { disableSnapshot: true },
  },
};
