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
    sitename: "For government",
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
          "<p>We pay our respects to the Aboriginal and Torres Strait Islander ancestors of this land, their spirits and their legacy. The foundations laid by these ancestors—our First Nations peoples—give strength, inspiration and courage to current and future generations towards creating a better Queensland.</p>",
      },
    ],
  },
  render: (args) => new FooterForgov(args).html,
};
