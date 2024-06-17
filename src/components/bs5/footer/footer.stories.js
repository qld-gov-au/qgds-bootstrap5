// footer.stories.js
import { Footer, FooterForgov } from "./Footer.js";

import defaultdata from "./footer.data.json";

export default {
  tags: ["autodocs"],
  title: "!Core/Footer",
  render: (args) => new Footer(args).html,
};

/**
 * Example footer
 */
export const Default = {
  args: defaultdata,
  parameters: {
    controls: { include: [] },
  },
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

/**
 * Forgov footer
 */

export const Forgov = {
  args: {
    ...defaultdata,
    variantClass: "dark",
    sitename: "For Government",
    footerHasCrest: false,
    feedbackFormEnabled: true,
    followlinksEnabled: false,
    contactHasContactList: false,
    copyrightHasYearFrom: true,
    footerHasStateOfQld: false,
    acknowledgements: [
      {
        title: "Cultural acknowledgement",
        content:
          "<p>Queensland Government acknowledges the Traditional Owners of the land and pays respect to Elders past, present and future.</p>",
      },
    ],
  },
  render: (args) => new FooterForgov(args).html,
};
