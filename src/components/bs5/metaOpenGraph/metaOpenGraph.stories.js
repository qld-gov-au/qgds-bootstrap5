import MetaDcTermsData from "./MetaOpenGraph.data.json";
import { MetaOpenGraph } from "./MetaOpenGraph.js";

const defaultData = {
  ...MetaDcTermsData,
  title: "this is my title",
  uri: "https://forgov.qld.gov.au/projects-and-initiatives/search-for-projects-and-initiatives",
  description: "this is my description",
};

export default {
  tags: ["autodocs"],
  title: "1. Core Styles/Head/Meta OpenGraph and SEO",
  args: defaultData,
  render: (args) => {
    return new MetaOpenGraph(args).html;
  },

  argTypes: {},

  parameters: {
    docs: {
      controls: {},
      codeReferences: [
        {
          label: "HTML",
          language: "html",
          content: new MetaOpenGraph(defaultData).html,
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
