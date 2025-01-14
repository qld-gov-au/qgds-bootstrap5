// BackToTop.stories.js
import { BackToTop } from './backToTop.js';
import defaultdata from './backToTop.data.json';

export default {
  tags: ["autodocs"],
  title: "3. Components/BackToTop",
  render: (args) => new BackToTop(args).html,
};

/**
 * Default blockquote
 */
export const Default = {
  args: defaultdata,
};

