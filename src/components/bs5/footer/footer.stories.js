// footer.stories.js
import { Footer, FooterForgov } from './Footer.js';

import defaultdata from './footer.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Footer',
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
  },
  render: (args) => new FooterForgov(args).html,
};
