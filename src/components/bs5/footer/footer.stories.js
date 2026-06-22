// footer.stories.js
import { Footer } from "./Footer.js";
import defaultdata from "./footer.data.json";
import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "2. Layout/Footer",
  render: (args) => new Footer(args).html,
  argTypes: {
    sitename: {
      name: "Site Name",
      description: "Name of the site",
      control: { type: "text" },
    },
    contact: {
      name: "Contact",
      description: "Contact section details",
      control: { type: "object" },
    },
    organisationLink: {
      name: "Organisation link",
      description: "organisation section details",
      control: { type: "object" },
    },
    acknowledgements: {
      name: "Acknowledgements",
      description: "Acknowledgements section details",
      control: { type: "array" },
    },
    copyright: {
      name: "Copyright",
      description: "Copyright section details",
      control: { type: "object" },
    },
  },
  parameters: {
    coderefs: {
      partialname: "footer", //{{> footer }}
      metadata,
    },
  },
};

/**
 * Example footer
 */
export const Default = {
  args: defaultdata,
};

/**
 * Example footer doing handlebars defaults
 */
export const DefaultBlank = {
  args: {},
};

/**
 * Footer: White
 */
export const Dark = {
  args: {
    ...defaultdata,
    variantClass: "dark",
  },
  parameters: {
    controls: { include: [] },
  },
};

/**
 * Footer: Dark Alternative
 */
export const DarkAlt = {
  args: {
    ...defaultdata,
    variantClass: "dark-alt",
  },
  parameters: {
    controls: { include: [] },
  },
};
